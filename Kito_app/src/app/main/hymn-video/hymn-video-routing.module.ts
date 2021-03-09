import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HymnVideoPage } from './hymn-video.page';

const routes: Routes = [
  {
    path: '',
    component: HymnVideoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HymnVideoPageRoutingModule {}
