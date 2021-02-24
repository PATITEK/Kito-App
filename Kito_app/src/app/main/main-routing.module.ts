
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
  },
  {
    path: 'catechism-class',
    loadChildren: () => import('./catechism-class/catechism-class.module').then( m => m.CatechismClassPageModule)
  },
  {
    path: 'tonggiaophan',
    loadChildren: () => import('./tonggiaophan/tonggiaophan.module').then( m => m.TonggiaophanPageModule)
  },
  {
    path: 'prayer-time',
    loadChildren: () => import('./prayer-time/prayer-time.module').then( m => m.PrayerTimePageModule)
  },
  {
    path: 'store',
    loadChildren: () => import('./store/store.module').then( m => m.StorePageModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule { }
