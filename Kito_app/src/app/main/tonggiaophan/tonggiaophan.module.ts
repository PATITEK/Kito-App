import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TonggiaophanPageRoutingModule } from './tonggiaophan-routing.module';

import { TonggiaophanPage } from './tonggiaophan.page';
import { HeaderModule } from 'src/app/@modular/header/header.module';
import { SearchBarNavModule } from 'src/app/@modular/search-bar-nav/search-bar-nav.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TonggiaophanPageRoutingModule,
    HeaderModule,
    SearchBarNavModule
  ],
  declarations: [TonggiaophanPage]
})
export class TonggiaophanPageModule { }
