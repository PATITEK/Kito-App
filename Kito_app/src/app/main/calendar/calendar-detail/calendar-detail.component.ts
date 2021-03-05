import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-detail',
  templateUrl: './calendar-detail.component.html',
  styleUrls: ['./calendar-detail.component.scss'],
})
export class CalendarDetailComponent implements OnInit {
  headerCustom = { title: 'Lịch Công Giáo' };
  photo ='assets/img/calendar/calendar-date.jpg'
  constructor() { }

  ngOnInit() {}

}
