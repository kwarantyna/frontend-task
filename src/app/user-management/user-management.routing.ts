import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './components/user-management.component';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { DeleteUserComponent } from './components/users/delete-user/delete-user.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { UserFormComponent } from './components/users/user-form/user-form.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { userResolver } from './resolver/user.resolver';

export const routedComponents = [
  UserManagementComponent,
  UserListComponent,
  UserFormComponent,
  DeleteUserComponent,
  EditUserComponent,
  AddUserComponent,
];

export const routes: Routes = [
  { path: '', redirectTo: 'user-list', pathMatch: 'full' },
  {
    path: 'user-list',
    component: UserManagementComponent,
  },
  { path: 'add-user', component: AddUserComponent },
  {
    path: 'edit-user/:id',
    component: EditUserComponent,
    resolve: { data: userResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule {}
