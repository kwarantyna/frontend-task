import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {
  UserManagementRoutingModule,
  routedComponents,
} from './user-management.routing';

@NgModule({
  declarations: [routedComponents],
  imports: [CommonModule, SharedModule, UserManagementRoutingModule],
})
export class UserManagementModule {}
