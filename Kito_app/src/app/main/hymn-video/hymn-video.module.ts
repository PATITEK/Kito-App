import { SearchBarNavModule } from 'src/app/@modular/search-bar-nav/search-bar-nav.module';
import { HeaderModule } from './../../@modular/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HymnVideoPageRoutingModule } from './hymn-video-routing.module';

import { HymnVideoPage } from './hymn-video.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HymnVideoPageRoutingModule,
    HeaderModule,
    SearchBarNavModule
  ],
  declarations: [HymnVideoPage]
})
export class HymnVideoPageModule {}
