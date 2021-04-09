import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountSettingPageRoutingModule } from './account-setting-routing.module';

import { AccountSettingPage } from './account-setting.page';
import { HeaderModule } from '../@modular/header/header.module';
import { AlertService } from '../@app-core/utils/alert.service';
import { ModalService } from '../@app-core/utils/modal.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountSettingPageRoutingModule,
    HeaderModule
  ],
  providers: [
    AlertService,
    ModalService
  ],
  declarations: [AccountSettingPage]
})
export class AccountSettingPageModule {}
