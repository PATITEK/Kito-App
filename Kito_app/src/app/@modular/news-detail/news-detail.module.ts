import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsDetailPageRoutingModule } from './news-detail-routing.module';

import { NewsDetailPage } from './news-detail.page';
import { SearchBarNavComponent } from '../search-bar-nav/search-bar-nav.component';
import { HeaderComponent } from '../header/header.component';
import { MainItemComponent } from '../main-item/main-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsDetailPageRoutingModule,
  ],
  declarations: [
    NewsDetailPage,
    SearchBarNavComponent,
    HeaderComponent,
    MainItemComponent
  ]
})
export class NewsDetailPageModule { }
