import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { LogoComponent } from "./components/logo/logo.component";
import { CustomMaterialModule } from "./material.module";

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    CustomMaterialModule,
    ReactiveFormsModule,
    TranslateModule,
    LogoComponent,
    FormsModule,
  ],
  declarations: [LogoComponent],
})
export class SharedModule {}
