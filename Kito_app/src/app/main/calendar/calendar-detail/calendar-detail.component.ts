import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calendar-detail',
  templateUrl: './calendar-detail.component.html',
  styleUrls: ['./calendar-detail.component.scss'],
})
export class CalendarDetailComponent implements OnInit {
  headerCustom = { title: 'Lịch Công Giáo' };
  photo ='assets/img/calendar/calendar-date.jpg'
  constructor(
    private route: ActivatedRoute,
    
  ) { }

  dayDetail;
  coutnCalendar=100;
  slideOpts = {

    initialSlide: this.coutnCalendar,
    speed: 400
  };
  ngOnInit() {
    this.getData();
  }
  getData(){
    this.route.queryParams.subscribe(params => {
      this.dayDetail = JSON.parse(params['data']).day;
      console.log(this.dayDetail);
      
    }).unsubscribe();
  }
  numSequence(n: number): Array<number> {
    return Array(n);
  }
  ionSlideNextEnd() {
    this.dayDetail++;
    this.coutnCalendar++;
  }

  ionSlidePrevEnd() {
    this.dayDetail--;
    this.coutnCalendar++;
  }
}
