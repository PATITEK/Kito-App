import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoriesPageRoutingModule } from './stories-routing.module';

import { StoriesPage } from './stories.page';
import { HeaderModule } from 'src/app/@modular/header/header.module';
import { SearchBarNavModule } from 'src/app/@modular/search-bar-nav/search-bar-nav.module';
import { FooterModule } from 'src/app/@modular/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoriesPageRoutingModule,
    HeaderModule,
    SearchBarNavModule,
    FooterModule
  ],
  declarations: [StoriesPage]
})
export class StoriesPageModule {}
