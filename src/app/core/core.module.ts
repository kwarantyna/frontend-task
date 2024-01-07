import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { HeaderComponent } from "./components/header/header.component";
import { HomeComponent } from "./components/home/home.component";
import { SidenavHeaderComponent } from "./components/sidenav/sidenav-header/sidenav-header.component";
import { SidenavComponent } from "./components/sidenav/sidenav.component";

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    SidenavComponent,
    SidenavHeaderComponent,
  ],

  imports: [CommonModule, SharedModule, RouterModule],
  exports: [HomeComponent, HeaderComponent, SidenavComponent, RouterModule],
})
export class CoreModule {}

