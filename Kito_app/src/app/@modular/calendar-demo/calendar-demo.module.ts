import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarDemoComponent } from './calendar-demo.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [CalendarDemoComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports:[
    CalendarDemoComponent
  ]
  
})
export class CalendarDemoModule { }
