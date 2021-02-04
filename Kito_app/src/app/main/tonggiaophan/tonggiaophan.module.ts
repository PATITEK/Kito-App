import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TonggiaophanPageRoutingModule } from './tonggiaophan-routing.module';

import { TonggiaophanPage } from './tonggiaophan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TonggiaophanPageRoutingModule
  ],
  declarations: [TonggiaophanPage]
})
export class TonggiaophanPageModule {}
