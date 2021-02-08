import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainSlideRoutingModule } from './main-slide-routing.module';
import { MainItemComponent } from '../main-item/main-item.component';


@NgModule({
  declarations: [MainItemComponent],
  imports: [
    CommonModule,
    MainSlideRoutingModule
  ],
  exports: [
    MainItemComponent
  ]
})
export class MainSlideModule { }
