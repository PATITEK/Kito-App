import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TonggiaophanPage } from './tonggiaophan.page';

const routes: Routes = [
  {
    path: '',
    component: TonggiaophanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TonggiaophanPageRoutingModule {}
