import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { CustomMaterialModule } from './material.module';
import { EnumPipe } from './pipes/enum.pipe';

@NgModule({
  declarations: [MenuComponent, EnumPipe],
  imports: [
    CommonModule,
    CustomMaterialModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    MenuComponent,
    CustomMaterialModule,
    ReactiveFormsModule,

    EnumPipe,
  ],
})
export class SharedModule {}
