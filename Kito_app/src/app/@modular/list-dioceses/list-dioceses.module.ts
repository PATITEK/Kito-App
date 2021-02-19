import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDiocesesComponent } from './list-dioceses.component';
import { ListDiocesesRoutingModule } from './list-dioceses-routing.module';



@NgModule({
  declarations: [ListDiocesesComponent],
  imports: [
    CommonModule,
    ListDiocesesRoutingModule
  ],
  exports: [
    ListDiocesesComponent
  ]
})
export class ListDiocesesModule { }
