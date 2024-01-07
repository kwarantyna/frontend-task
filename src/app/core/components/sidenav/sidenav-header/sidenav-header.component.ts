import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { Subscription } from "rxjs";
import { IProfile } from "src/app/core/model/profile.model";
import { ProfileService } from "src/app/core/services/profile.service";

@Component({
  selector: "app-sidenav-header",
  templateUrl: "./sidenav-header.component.html",
  styleUrls: ["./sidenav-header.component.scss"],
})
export class SidenavHeaderComponent implements OnInit, OnDestroy {
  getMyProfileSubscription!: Subscription;
  profile!: IProfile;

  @Output() onMenuClicked = new EventEmitter<boolean>();

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.getMyProfile();
  }

  getMyProfile() {
    this.getMyProfileSubscription = this.profileService
      .getMyProfile()
      .subscribe((profile: IProfile) => {
        this.profile = profile;
      });
  }

  emitMenuClicked() {
    this.onMenuClicked.emit(true);
  }

  ngOnDestroy(): void {
    this.getMyProfileSubscription.unsubscribe();
  }
}

