import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        redirectTo: "users",
        pathMatch: "full",
      },
      {
        path: "users",
        loadChildren: () =>
          import("./user-management/user-management.module").then(
            m => m.UserManagementModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

