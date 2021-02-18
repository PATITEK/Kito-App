import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatechismMarriagePageRoutingModule } from './catechism-marriage-routing.module';

import { CatechismMarriagePage } from './catechism-marriage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatechismMarriagePageRoutingModule
  ],
  declarations: [CatechismMarriagePage]
})
export class CatechismMarriagePageModule {}
