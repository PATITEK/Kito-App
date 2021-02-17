import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './@app-core/auth-guard.service';
import {} from './changepassword/changepassword.module'
import {SlideComponent} from './@modular/slide/slide.component';

const routes: Routes = [
  {
    path: 'auth-manager',
    loadChildren: () => import('./auth-manager/auth-manager.module').then(m => m.AuthManagerPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then(m => m.MainPageModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'donate',
    loadChildren: () => import('./donate/donate.module').then(m => m.DonatePageModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'paymentmethods',
    loadChildren: () => import('./paymentmethods/paymentmethods.module').then( m => m.PaymentmethodsPageModule)
  },
  {
    path: 'pray',
    loadChildren: () => import('./pray/pray.module').then(m => m.PrayPageModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'page-noti',
    loadChildren: () => import('./@modular/page-noti/page-noti-routing.module').then(m => m.PageNotiRoutingModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'changepassword',
    loadChildren: () => import('./changepassword/changepassword.module').then( m => m.ChangepasswordPageModule)
  },
  // {
  //   path: 'chabad',
  //   loadChildren: () => import('./chabad/chabad.module').then(m => m.ChabadPageModule),
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: 'account',
  //   loadChildren: () => import('./account/account.module').then(m => m.AccountPageModule)
  // },
  // {
  //   path: 'event',
  //   loadChildren: () => import('./event/event.module').then(m => m.EventPageModule),
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: 'food',
  //   loadChildren: () => import('./food/food.module').then(m => m.FoodPageModule),
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: 'account-setting',
  //   loadChildren: () => import('./account-setting/account-setting.module').then(m => m.AccountSettingPageModule)
  // },
  // {
  //   path: 'history',
  //   loadChildren: () => import('./history/history.module').then( m => m.HistoryPageModule)
  // },
  {
    path: 'slide',
    loadChildren: () => import('./@modular/slide/slide.module').then( m => m.SlideModule)
  },
  {
    path: 'modal-detail-order',
    loadChildren: () => import('./@modular/modal-detail-order/modal-detail-order.module').then( m => m.ModalDetailOrderPageModule)
  },
  {
    path: 'news-detail',
    loadChildren: () => import('./@modular/news-detail/news-detail.module').then( m => m.NewsDetailPageModule)
  },
  { path: '', redirectTo: '/auth-manager/login', pathMatch: 'full' },
  { path: '**'  , redirectTo: 'main' },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
