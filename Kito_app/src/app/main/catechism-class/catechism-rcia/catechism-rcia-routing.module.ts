import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatechismRciaPage } from './catechism-rcia.page';

const routes: Routes = [
  {
    path: '',
    component: CatechismRciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatechismRciaPageRoutingModule {}
