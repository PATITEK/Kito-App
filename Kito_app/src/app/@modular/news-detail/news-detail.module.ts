import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsDetailPageRoutingModule } from './news-detail-routing.module';

import { NewsDetailPage } from './news-detail.page';
import { HeaderModule } from '../header/header.module';
import { SearchBarNavComponent } from '../search-bar-nav/search-bar-nav.component';
import { HeaderComponent } from '../header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsDetailPageRoutingModule,
    HeaderModule
  ],
  declarations: [
    NewsDetailPage,
    SearchBarNavComponent,
    HeaderComponent
  ]
})
export class NewsDetailPageModule { }
