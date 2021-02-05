import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TonggiaophanPage } from './tonggiaophan.page';

const routes: Routes = [
  {
    path: '',
    component: TonggiaophanPage
  },
  {
  path: 'parish-news',
  loadChildren: () => import('./parish-news/parish-news.module').then( m => m.ParishNewsPageModule)
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TonggiaophanPageRoutingModule {}
