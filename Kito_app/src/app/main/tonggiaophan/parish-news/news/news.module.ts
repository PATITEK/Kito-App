import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsPageRoutingModule } from './news-routing.module';

import { NewsPage } from './news.page';
import { HeaderModule } from 'src/app/@modular/header/header.module';
import { SearchBarNavModule } from 'src/app/@modular/search-bar-nav/search-bar-nav.module';
import { FooterModule } from 'src/app/@modular/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsPageRoutingModule,
    HeaderModule,
    SearchBarNavModule,
    FooterModule
  ],
  declarations: [ NewsPage ]
})
export class NewsPageModule { }
