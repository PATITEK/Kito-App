import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

import { 
  CalendarModal, CalendarModalOptions, 
  DayConfig } from 'ion2-calendar';
import * as moment from 'moment'; // add this 1 of 4
import { DateTimeService } from 'src/app/@app-core/utils';
import { CalendarComponent } from "ionic2-calendar";
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  headerCustom = { title: 'Lịch Công Giáo' };
  @ViewChild(CalendarComponent, null) myCalendar:CalendarComponent;
  eventSource;
  viewTitle;
Title:string;
  isToday:boolean;
  calendar = {
      mode: 'month',
      currentDate: new Date(),
      dateFormatter: {
          formatMonthViewDay: function(date:Date) {
              return date.getDate().toString();
          },
          
          formatMonthViewDayHeader: function(date:Date) {
              return 'MonMH';
          },
          formatMonthViewTitle: function(date:Date) {
              return 'testMT';
          },
          formatWeekViewDayHeader: function(date:Date) {
              return 'MonWH';
          },
          formatWeekViewTitle: function(date:Date) {
              return 'testWT';
          },
          formatWeekViewHourColumn: function(date:Date) {
              return 'testWH';
          },
          formatDayViewHourColumn: function(date:Date) {
              return 'testDH';
          },
          formatDayViewTitle: function(date:Date) {
              return 'testDT';
          },
          
      }
  };

  constructor(
    private navController:NavController,
    private dateTimeService:DateTimeService
    ) {

  }
 ngOnInit(){
   this.loadEvents();
 }
 onViewTitleChange(title){
   this.viewTitle=title;
 }
  loadEvents() {
      this.eventSource = this.createRandomEvents();
  }

  onViewTitleChanged(title) {
    // let date =new Date(title).getMonth();
    this.viewTitle=title;
     
      
      
  }
nextMonth(){
    this.myCalendar.slideNext();
    this.eventSource=this.createRandomEvents();
    console.log(this.eventSource);
    
}
PrewMonth(){
    this.myCalendar.slidePrev();
}
// slideNext() {
//     this.myCalendar.slideNext();
// }
  onEventSelected(event) {
      console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

  changeMode(mode) {
      this.calendar.mode = mode;
  }

  today() {
      this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev) {
     
  }

  onCurrentDateChanged(event:Date) {
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      event.setHours(0, 0, 0, 0);
      this.isToday = today.getTime() === event.getTime();
     
      
      
      
  }

  createRandomEvents() {
      var events = [];
      for (var i = 0; i < 50; i += 1) {
          var date = new Date();
         
        
          var eventType = Math.floor(Math.random() * 2);
          var startDay = Math.floor(Math.random() * 350) - 45;
          var endDay = Math.floor(Math.random() * 2) + startDay;
          var startTime;
          var endTime;
          if (eventType === 0) {
              startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
              if (endDay === startDay) {
                  endDay += 1;
              }
              endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
              events.push({
                  title: 'All Day - ' + i,
                  startTime: startTime,
                  endTime: endTime,
                  allDay: true,
                  color:"blue"
              });
          } else {
              var startMinute = Math.floor(Math.random() * 24 * 60);
              var endMinute = Math.floor(Math.random() * 180) + startMinute;
              startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
              endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
              events.push({
                  title: 'Event - ' + i,
                  startTime: startTime,
                  endTime: endTime,
                  allDay: false,
                  color:"red"
              });
          }
      }
      return events;
  }

  onRangeChanged(ev) {
      console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  markDisabled = (date:Date) => {
      var current = new Date();
      current.setHours(0, 0, 0);
      return date < current;
  };

 
}
