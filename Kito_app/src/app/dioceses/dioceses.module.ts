import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiocesesPageRoutingModule } from './dioceses-routing.module';

import { DiocesesPage } from './dioceses.page';
import { FooterModule } from '../@modular/footer/footer.module';
import { HeaderModule } from '../@modular/header/header.module';
import { SearchBarNavModule } from '../@modular/search-bar-nav/search-bar-nav.module';
import { ListDiocesesModule } from '../@modular/list-dioceses/list-dioceses.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiocesesPageRoutingModule,
    HeaderModule,
    SearchBarNavModule,
    ListDiocesesModule,
    FooterModule
  ],
  declarations: [DiocesesPage]
})
export class DiocesesPageModule {}
