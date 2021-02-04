import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatechismClassPageRoutingModule } from './catechism-class-routing.module';

import { CatechismClassPage } from './catechism-class.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatechismClassPageRoutingModule
  ],
  declarations: [CatechismClassPage]
})
export class CatechismClassPageModule {}
