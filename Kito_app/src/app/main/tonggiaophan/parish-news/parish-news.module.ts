import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParishNewsPageRoutingModule } from './parish-news-routing.module';

import { ParishNewsPage } from './parish-news.page';
import { HeaderModule } from 'src/app/@modular/header/header.module';
import { MainSlideModule } from 'src/app/@modular/main-slide/main-slide.module';
import { MainSlideComponent } from 'src/app/@modular/main-slide/main-slide.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParishNewsPageRoutingModule,
    HeaderModule
  ],
  declarations: [ParishNewsPage, MainSlideComponent]
})
export class ParishNewsPageModule {}
