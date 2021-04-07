import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';
import { MainSlideModule } from '../@modular/main-slide/main-slide.module';
import { OneSignalService } from '../@app-core/utils';
import { AlertService } from '../@app-core/utils/alert.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
    MainSlideModule
  ],
  providers: [
    OneSignalService,
    AlertService
  ],
  declarations: [MainPage]
})
export class MainPageModule { }
