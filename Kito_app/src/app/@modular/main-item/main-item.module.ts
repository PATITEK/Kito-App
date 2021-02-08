import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainItemRoutingModule } from './main-item-routing.module';
import { MainItemComponent } from './main-item.component';



@NgModule({
  declarations: [MainItemComponent],
  imports: [
    CommonModule,
    MainItemRoutingModule
  ],
  exports: [
    MainItemComponent
  ]
})
export class MainItemModule { }
