import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonSlides } from '@ionic/angular';
import { EventsService, IPageEvent } from 'src/app/@app-core/http';
import { DateTimeService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-prayer-time',
  templateUrl: './prayer-time.page.html',
  styleUrls: ['./prayer-time.page.scss'],
})
export class PrayerTimePage implements OnInit {
  @ViewChild('slides', { static: false }) slides: IonSlides;
  @ViewChild(IonContent) ionContent: IonContent;

  slideOptions = {
    initialSlide: 0,
    autoHeight: true
  };

  pageReq: IPageEvent = {
    cal_date: ''
  }

  parish = {
    thumbImage: 'assets/img/tonggiaophan/hanoi.svg',
    name: 'Giáo xứ Chánh Tòa Sài Gòn'
  }

  dateList = [];
  activeDateItemId;

  parishNameHeight = 0;

  constructor(
    public dateTimeService: DateTimeService,
    private router: Router,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.initDateList();
    this.getData();
  }

  ionViewWillEnter() {
    const dateItemId = localStorage.getItem('dateItemId');
    if (dateItemId) {
      this.changeSegment(dateItemId);
      localStorage.removeItem('dateItemId');
    }
  }

  ionViewDidEnter() {
    const parishNameElement: any = document.querySelector('.parish-name');
    this.parishNameHeight = parishNameElement.offsetHeight;
  }

  initDateList() {
    const now = new Date();
    for (let i = 0; i < 7; i++) {
      let nextDate = new Date(now);
      nextDate.setDate(nextDate.getDate() + i);

      this.dateList.push({
        id: i,
        date: nextDate,
        color: '',
        name: '',
        events: []
      })

      this.activeDateItemId = this.dateList[0].id;
    }
  }

  getData() {
    for (let i = 0; i < 7; i++) {
      this.pageReq.cal_date = this.dateTimeService.getDateString2(this.dateList[i].date);
      this.eventsService.getAll(this.pageReq).subscribe(data => {
        console.log(data);
        if (this.dateTimeService.isEmptyObject(data.calendar)) {
          return;
        }
        data.calendar.events.forEach(event => {
          event.start_time = new Date(event.start_time);
          event.name = event.start_time.getHours() >= 12 ? 'Lễ tối' : 'Lễ sáng';
        });
        this.dateList[i].name = data.calendar.name;
        this.dateList[i].date = new Date(data.calendar.date);
        this.dateList[i].color = data.calendar.shirt_color.color_code;
        this.dateList[i].events = data.calendar.events;
      })
    }
  }

  changeDateItem(id) {
    this.activeDateItemId = id
  }

  changeSegmentSlide() {
    this.slides.getActiveIndex().then(index => {
      this.changeDateItem(index);
    })
  }

  scrollToTop(value) {
    this.ionContent.scrollToTop(value);
  }

  changeSegment(id) {
    this.slides.slideTo(id).then(() => this.changeDateItem(id));
  }

  goToEventDetail(dateItem, event) {
    const data = {
      dateList: this.dateList,
      dateItem: dateItem,
      eventId: event.id
    }
    this.router.navigate(['main/prayer-time/prayer-detail'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }

  paddingTopIonContent() {
    return `calc(60vw + ${this.parishNameHeight}px + 60px + 15px)`
  }
}
