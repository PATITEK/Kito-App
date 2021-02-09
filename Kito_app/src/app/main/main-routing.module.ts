
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'chabad',
        loadChildren: () => import('./chabad/chabad.module').then(m => m.ChabadPageModule)
      },
      {
        path: 'people',
        loadChildren: () => import('./people/people.module').then(m => m.PeoplePageModule)
      },
      {
        path: 'shopping',
        loadChildren: () => import('./shopping/shopping.module').then(m => m.ShoppingPageModule)
      },
      {
        path: 'event',
        loadChildren: () => import('./event/event.module').then( m => m.EventPageModule)
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
        path: 'news-detail',
        loadChildren: () => import('./../@modular/news-detail/news-detail.module').then( m => m.NewsDetailPageModule)
      },
    ]
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
