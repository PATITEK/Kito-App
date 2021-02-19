import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiocesesPageRoutingModule } from './dioceses-routing.module';

import { DiocesesPage } from './dioceses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiocesesPageRoutingModule
  ],
  declarations: [DiocesesPage]
})
export class DiocesesPageModule {}
