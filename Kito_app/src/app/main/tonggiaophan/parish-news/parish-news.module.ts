import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParishNewsPageRoutingModule } from './parish-news-routing.module';

import { ParishNewsPage } from './parish-news.page';
import { HeaderModule } from 'src/app/@modular/header/header.module';
import { MenuModule } from 'src/app/@modular/menu/menu.module';
import { MainSlideModule } from 'src/app/@modular/main-slide/main-slide.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParishNewsPageRoutingModule,
    HeaderModule,
    MenuModule,
    MainSlideModule
  ],
  declarations: [ParishNewsPage]
})
export class ParishNewsPageModule {}
