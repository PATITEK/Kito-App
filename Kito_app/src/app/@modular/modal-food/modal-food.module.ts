import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalFoodComponent } from './modal-food.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [
      ModalFoodComponent
    ],
    imports: [
      CommonModule,
      IonicModule
    ],
    exports: [
      ModalFoodComponent
    ]
  })
  export class ModalFoodModule { }