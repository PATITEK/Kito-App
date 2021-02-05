import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParishNewsPage } from './parish-news.page';

const routes: Routes = [
  {
    path: '',
    component: ParishNewsPage
  },  {
    path: 'news',
    loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule)
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
