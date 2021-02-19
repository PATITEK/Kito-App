import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountSettingPage } from './account-setting.page';

const routes: Routes = [
  {
    path: '',
    component: AccountSettingPage
  },
  {
    path: 'orders-history',
    loadChildren: () => import('./orders-history/orders-history.module').then( m => m.OrdersHistoryPageModule)
  },  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule)
  }

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountSettingPageRoutingModule {}
