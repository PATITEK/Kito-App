import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalResComponent } from './modal-res.component';
import { IonicModule } from '@ionic/angular';
@NgModule({
  declarations: [
    ModalResComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ModalResComponent
  ]
})
export class ModalResModule { }
