import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { UserFilterComponent } from "./components/users/user-filter/user-filter.component";
import {
  UserManagementRoutingModule,
  routedComponents,
} from "./user-management.routing";

@NgModule({
  declarations: [routedComponents, UserFilterComponent],
  imports: [CommonModule, SharedModule, UserManagementRoutingModule],
})
export class UserManagementModule {}

