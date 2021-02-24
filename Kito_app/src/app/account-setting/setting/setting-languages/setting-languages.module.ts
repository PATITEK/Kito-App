import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingLanguagesPageRoutingModule } from './setting-languages-routing.module';

import { SettingLanguagesPage } from './setting-languages.page';
import { HeaderModule } from 'src/app/@modular/header/header.module';
import { SearchBarNavComponent } from 'src/app/@modular/search-bar-nav/search-bar-nav.component';
import { HeaderComponent } from 'src/app/@modular/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingLanguagesPageRoutingModule,
    HeaderModule
  ],
  declarations: [
    SettingLanguagesPage,
    SearchBarNavComponent,
  ]
})
export class SettingLanguagesPageModule {}
