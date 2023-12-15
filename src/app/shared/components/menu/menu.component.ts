import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  routerEventSubscription!: Subscription;
  header: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.routerEventSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute: string = event.url;

        if (currentRoute.includes('user-list')) {
          this.header = 'Użytkownicy';
        } else if (currentRoute.includes('add-user')) {
          this.header = 'Dodaj nowego użytkownika';
        } else if (currentRoute.includes('edit-user')) {
          this.header = 'Edytuj użytkownika';
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.routerEventSubscription.unsubscribe();
  }
}
