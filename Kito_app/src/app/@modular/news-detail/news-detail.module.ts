import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsDetailPageRoutingModule } from './news-detail-routing.module';

import { NewsDetailPage } from './news-detail.page';
import { HeaderComponent } from '../header/header.component';
import { SearchBarNavComponent } from '../search-bar-nav/search-bar-nav.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsDetailPageRoutingModule
  ],
  declarations: [NewsDetailPage, HeaderComponent, SearchBarNavComponent]
})
export class NewsDetailPageModule {}
