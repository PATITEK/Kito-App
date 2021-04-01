import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { CalendarService } from 'src/app/@app-core/http';
import { IPageCalendar } from 'src/app/@app-core/http/calendar/calendar.DTO';
import { DayPipe } from 'src/app/@app-core/pipe/pipiday.pipe';
import { LoadingService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-calendar-detail',
  templateUrl: './calendar-detail.component.html',
  styleUrls: ['./calendar-detail.component.scss'],
})
export class CalendarDetailComponent implements OnInit {
  headerCustom = { title: 'Lịch Công Giáo' };
  photo = 'assets/img/calendar/calendar-date.jpg'
  constructor(
    private route: ActivatedRoute,
    private calemdarService: CalendarService,
    private loading: LoadingService

  ) { }
  dayWeeks = [

    {
      valueView: "Thứ 2",
      value: 1
    },
    {
      valueView: "Thứ 3",
      value: 2
    },
    {
      valueView: "Thứ 4",
      value: 3
    },
    {
      valueView: "Thứ 5",
      value: 4
    },
    {
      valueView: "Thứ 6",
      value: 5
    },
    {
      valueView: "Thứ 7",
      value: 6
    },
    {
      valueView: "Chúa Nhật",
      value: 0
    },
  ];
  daynow;
  dayDetail;
  monthDetail;
  yearDetail;
  dayLunner;
  monthLunner;
  yearLunner;
  dayofWeekend;
  coutnCalendar = 3;
  colorDay;
  fix=0;
  slideOpts = {

    initialSlide: 1,
    speed: 400
  };
  slide:IonSlides
  public pageResult: IPageCalendar = {
    page: 1,
    per_page: 10,
    total_objects: 0,
    search: '',
    cal_date: ''
  };
  @ViewChild('slides', { static: false }) slides: IonSlides;
  ngOnInit() {
    this.loading.present();
  }

  slideChanged(slides: IonSlides) {
    slides.getActiveIndex().then((index: number) => {
    });
  }
  ionViewWillEnter(){
    this.getData();
    
  }
 
  getData() {
    this.route.queryParams.subscribe(params => {
          let tmp = new Date(JSON.parse(params['data']).day);
      this.daynow = new Date(JSON.parse(params['data']).day);
      this.dayDetail = tmp.getDate();
      this.pageResult.cal_date = tmp.getFullYear() + '-' + (tmp.getMonth()+1) + '-' + tmp.getDate();
      this.calemdarService.getByday(this.pageResult).subscribe((data: any) => {
        this.loading.dismiss();
        let day = new Date(data.calendar.date);
        let tmp1 = new Date(data.calendar.lunar_date);
        let color = data.calendar.shirt_color.color_code;
        this.getAPiday(color,day,tmp1)
      })


    }).unsubscribe();
  }
  getAPiday(color,day,tmp1){
    this.colorDay = color;
    this.dayDetail = day.getDate();
    this.monthDetail = day.getMonth();
    this.yearDetail = day.getFullYear();
    this.dayLunner = tmp1.getDate();
    this.monthLunner = tmp1.getMonth();
    this.yearLunner = tmp1.getFullYear();
    this.dayofWeekend = this.PipeDay(day.getDay());
  }
  numSequence(n: number): Array<number> {
    return Array(n);
  }
  ionSlideNextS() {
    if(this.fix==0)
    {
      this.fix++;
      return;
    }
    let dayTmp=new Date(this.pageResult.cal_date);
    let nextDay = new Date(dayTmp);
    nextDay.setDate(dayTmp.getDate()+1);
    this.pageResult.cal_date=nextDay.toString();
    this.calemdarService.getByday(this.pageResult).subscribe((data: any) => {
      let day = new Date(data.calendar.date);
      let tmp1 = new Date(data.calendar.lunar_date);
      let color = data.calendar.shirt_color.color_code;

      this.getAPiday(color, day, tmp1)
      this.coutnCalendar++;
      

    })
    
    
  }

  ionSlidePrevEnd() {
    if (this.fix == 0) {
      this.fix++;
      return;
    }
    let dayTmp = new Date(this.pageResult.cal_date);
    let prevDay = new Date(dayTmp);
    prevDay.setDate(dayTmp.getDate() - 1);
    this.pageResult.cal_date = prevDay.toString();
    this.calemdarService.getByday(this.pageResult).subscribe((data: any) => {
      let day = new Date(data.calendar.date);
      let tmp1 = new Date(data.calendar.lunar_date);
      let color = data.calendar.shirt_color.color_code;

      this.getAPiday(color, day, tmp1)
      this.coutnCalendar++;

    })
  }

  PipeDay(value) {
   
      const index = this.dayWeeks.findIndex(x => x.value.toString() === value.toString());
      return this.dayWeeks[index].valueView;
    
  }
}
