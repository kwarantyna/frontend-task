import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IUser } from "src/app/user-management/model/user.model";

@Component({
  selector: "app-edit-user",
  template: `<app-user-form [userEditData]="user"></app-user-form>`,
})
export class EditUserComponent implements OnInit {
  user!: IUser;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getEditUserDataFromCurrentRoute();
  }

  getEditUserDataFromCurrentRoute() {
    this.activatedRoute.data.subscribe(user => {
      this.user = user["data"];
    });
  }
}

