import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatechismRciaPageRoutingModule } from './catechism-rcia-routing.module';

import { CatechismRciaPage } from './catechism-rcia.page';
import { SearchBarNavModule } from './../../../@modular/search-bar-nav/search-bar-nav.module';
import { HeaderModule } from './../../../@modular/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatechismRciaPageRoutingModule,
    HeaderModule,
    SearchBarNavModule
  ],
  declarations: [CatechismRciaPage]
})
export class CatechismRciaPageModule { }
