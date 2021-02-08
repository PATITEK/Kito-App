import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TonggiaophanPageRoutingModule } from './tonggiaophan-routing.module';

import { TonggiaophanPage } from './tonggiaophan.page';
import { HeaderComponent } from 'src/app/@modular/header/header.component';
import { SearchBarNavComponent } from 'src/app/@modular/search-bar-nav/search-bar-nav.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TonggiaophanPageRoutingModule
  ],
  declarations: [TonggiaophanPage,HeaderComponent, SearchBarNavComponent]
})
export class TonggiaophanPageModule {}
