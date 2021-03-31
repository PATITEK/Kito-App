import { SearchBarNavModule } from './../../@modular/search-bar-nav/search-bar-nav.module';
import { HeaderModule } from './../../@modular/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HymnMusicPageRoutingModule } from './hymn-music-routing.module';

import { HymnMusicPage } from './hymn-music.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HymnMusicPageRoutingModule,
    HeaderModule,
    SearchBarNavModule
  ],
  declarations: [HymnMusicPage]
})
export class HymnMusicPageModule {}
