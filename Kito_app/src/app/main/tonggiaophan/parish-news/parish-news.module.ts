import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParishNewsPageRoutingModule } from './parish-news-routing.module';

import { ParishNewsPage } from './parish-news.page';
import { HeaderComponent } from 'src/app/@modular/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParishNewsPageRoutingModule
  ],
  declarations: [ParishNewsPage, HeaderComponent]
})
export class ParishNewsPageModule {}
