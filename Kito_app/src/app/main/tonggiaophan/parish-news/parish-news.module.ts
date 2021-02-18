import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParishNewsPageRoutingModule } from './parish-news-routing.module';

import { ParishNewsPage } from './parish-news.page';
import { HeaderModule } from 'src/app/@modular/header/header.module';
import { MainSlideModule } from 'src/app/@modular/main-slide/main-slide.module';
import { MainSlideComponent } from 'src/app/@modular/main-slide/main-slide.component';
import { FooterModule } from 'src/app/@modular/footer/footer.module';
import { MenuComponent } from 'src/app/@modular/menu/menu.component';
import { MenuModule } from 'src/app/@modular/menu/menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParishNewsPageRoutingModule,
    HeaderModule,
    FooterModule,
    MenuModule
  ],
  declarations: [ParishNewsPage, MainSlideComponent]
})
export class ParishNewsPageModule {}
