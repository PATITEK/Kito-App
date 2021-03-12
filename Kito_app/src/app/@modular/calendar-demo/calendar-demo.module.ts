import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarDemoComponent } from './calendar-demo.component';
import { IonicModule } from '@ionic/angular';
import { PipeModule } from 'src/app/@app-core/pipe/pipe.module';

@NgModule({
  declarations: [CalendarDemoComponent],
  imports: [
    CommonModule,
    IonicModule,
    // PipeModule
  ],
  exports:[
    CalendarDemoComponent
  ]
  
})
export class CalendarDemoModule { }
