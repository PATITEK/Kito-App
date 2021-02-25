import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParishNewsPage } from './parish-news.page';

const routes: Routes = [
  {
    path: '',
    component: ParishNewsPage
  },
  {
    path: 'stories',
    loadChildren: () => import('./stories/stories.module').then( m => m.StoriesPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParishNewsPageRoutingModule {}
