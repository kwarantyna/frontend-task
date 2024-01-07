import {
  Component,
  EffectRef,
  OnDestroy,
  OnInit,
  ViewChild,
  effect,
} from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { Event, NavigationEnd, Router } from "@angular/router";
import { Subscription, filter, tap } from "rxjs";
import { InteractionService } from "src/app/shared/services/interaction.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  routerEventSubscription!: Subscription;
  header: string = "Users";
  isMobile!: boolean;
  mbileResolutionEffect: EffectRef;

  sidenavOpen = true;

  @ViewChild("sidenav") sidenav!: MatSidenav;

  constructor(
    private router: Router,
    public interactionService: InteractionService,
  ) {
    this.mbileResolutionEffect = effect(() => {
      this.isMobile = this.interactionService.isMobileResolution$();

      if (this.isMobile) {
        this.sidenavOpen = false;
      } else {
        this.sidenavOpen = true;
      }
    });
  }

  ngOnInit(): void {
    this.setHeaderAndCloseMobileMenuOnRouteChange();
  }

  setHeaderAndCloseMobileMenuOnRouteChange() {
    this.routerEventSubscription = this.router.events
      .pipe(
        filter(
          (event: Event | NavigationEnd): event is NavigationEnd =>
            event instanceof NavigationEnd,
        ),
        tap(() => {
          if (this.isMobile) {
            this.sidenav.close();
            this.sidenavOpen = false;
          }
        }),
      )
      .subscribe((event: NavigationEnd) => {
        const currentRoute: string = event.url;

        if (currentRoute.includes("user-list")) {
          this.header = "Users";
        } else if (currentRoute.includes("add-user")) {
          this.header = "AddUser";
        } else if (currentRoute.includes("edit-user")) {
          this.header = "EditUser";
        }
      });
  }

  toggleMenu() {
    this.sidenav.toggle();
    this.sidenavOpen = this.sidenav.opened;
  }

  ngOnDestroy(): void {
    this.routerEventSubscription.unsubscribe();
    this.mbileResolutionEffect.destroy();
  }
}

