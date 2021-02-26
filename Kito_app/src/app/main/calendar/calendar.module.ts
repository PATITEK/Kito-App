import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CalendarComponent, CalendarModule } from "ion2-calendar";
import { NgCalendarModule  } from 'ionic2-calendar';
import { CalendarPageRoutingModule } from './calendar-routing.module';
import { CalendarPage } from './calendar.page';
import { HeaderModule } from 'src/app/@modular/header/header.module';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/vi';
registerLocaleData(localeFr, 'vi');

@NgModule({
  declarations: [CalendarPage],
  imports: [
    CalendarModule,
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarPageRoutingModule,
    HeaderModule,
    NgCalendarModule,
    // CalendarModule
    // IonicModule.forRoot(CalendarPage)
    
  ],
})
export class CalendarPageModule {}
