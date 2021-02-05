import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoriesPageRoutingModule } from './stories-routing.module';

import { StoriesPage } from './stories.page';
import { HeaderComponent } from 'src/app/@modular/header/header.component';
import { SearchBarNavComponent } from 'src/app/@modular/search-bar-nav/search-bar-nav.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoriesPageRoutingModule
  ],
  declarations: [StoriesPage, HeaderComponent, SearchBarNavComponent]
})
export class StoriesPageModule {}
