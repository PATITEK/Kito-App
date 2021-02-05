import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsPageRoutingModule } from './news-routing.module';

import { NewsPage } from './news.page';
import { HeaderComponent } from 'src/app/@modular/header/header.component';
import { SearchBarNavComponent } from 'src/app/@modular/search-bar-nav/search-bar-nav.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsPageRoutingModule
  ],
  declarations: [NewsPage, HeaderComponent, SearchBarNavComponent]
})
export class NewsPageModule {}
