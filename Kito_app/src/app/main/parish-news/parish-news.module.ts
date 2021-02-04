import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParishNewsPageRoutingModule } from './parish-news-routing.module';

import { ParishNewsPage } from './parish-news.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParishNewsPageRoutingModule
  ],
  declarations: [ParishNewsPage]
})
export class ParishNewsPageModule {}
