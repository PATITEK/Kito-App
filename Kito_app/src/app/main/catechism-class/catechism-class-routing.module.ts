import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatechismClassPage } from './catechism-class.page';

const routes: Routes = [
  {
    path: '',
    component: CatechismClassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatechismClassPageRoutingModule {}
