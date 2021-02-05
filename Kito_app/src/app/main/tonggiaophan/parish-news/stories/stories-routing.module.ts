import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoriesPage } from './stories.page';

const routes: Routes = [
  {
    path: '',
    component: StoriesPage
  },
  {
    path: 'story-detail',
    loadChildren: () => import('./story-detail/story-detail.module').then( m => m.StoryDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoriesPageRoutingModule {}
