import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CalendarPageRoutingModule } from './calendar-routing.module';
import { CalendarPage } from './calendar.page';
import { HeaderModule } from 'src/app/@modular/header/header.module';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/vi';
import { CalendarDetailComponent } from './calendar-detail/calendar-detail.component';
registerLocaleData(localeFr, 'vi');

@NgModule({
  declarations: [CalendarPage, CalendarDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarPageRoutingModule,
    HeaderModule,
  ],
})
export class CalendarPageModule { }
