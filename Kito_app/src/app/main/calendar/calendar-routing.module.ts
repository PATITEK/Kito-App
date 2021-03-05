import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarDetailComponent } from './calendar-detail/calendar-detail.component';

import { CalendarPage } from './calendar.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarPage
  },
  {
    path: 'detail',
    component: CalendarDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarPageRoutingModule {}
