import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonSlides } from '@ionic/angular';
import { CalendarService, EventsService, IPageEvent } from 'src/app/@app-core/http';
import { DateTimeService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-prayer-time',
  templateUrl: './prayer-time.page.html',
  styleUrls: ['./prayer-time.page.scss'],
})
export class PrayerTimePage implements OnInit {
  @ViewChild('slides', { static: false }) slides: IonSlides;
  @ViewChild(IonContent) ionContent: IonContent;
  @ViewChild('fixed', { static: false }) fixedEl: ElementRef;

  slideOptions = {
    initialSlide: 0,
    autoHeight: true
  };

  pageReq: IPageEvent = {
    cal_date: null,
    parish_id: null
  }

  diocese = {
    thumbImage: 'assets/img/tonggiaophan/hanoi.svg',
    name: 'Giáo xứ Chánh Tòa Sài Gòn',
    address: '1 Công xã Paris, P. Bến Nghé, Quận 1, TP.HCM'
  }

  dateList = [];
  activeDateItemId;

  fixedElHeight = 0;

  constructor(
    public dateTimeService: DateTimeService,
    private router: Router,
    private eventsService: EventsService,
    private calendarService: CalendarService
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

    const parishId = localStorage.getItem('tempParishId');
    if (parishId) {
      localStorage.removeItem('tempParishId');
    }
  }

  ionViewDidEnter() {
    this.fixedEl && (this.fixedElHeight = this.fixedEl.nativeElement.offsetHeight);
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
    this.pageReq.parish_id = JSON.parse(localStorage.getItem('parish'))?.id;

    this.calendarService.getByWeek(new Date()).subscribe(data => {
      for (let i = 0; i < 7; i++) {
        this.dateList[i].name = data.calendars[i].mass_name;
        this.dateList[i].color = data.calendars[i].shirt_color.color_code;
      }
    })

    for (let i = 0; i < 7; i++) {
      this.pageReq.cal_date = this.dateList[i].date;
      this.eventsService.getAll(this.pageReq).subscribe(data => {
        if (!data.events.length) {
          return;
        }
        data.events.forEach(event => {
          event.start_time = new Date(event.start_time);
          event.name = event.start_time.getHours() >= 12 ? 'Lễ tối' : 'Lễ sáng';
        });
        this.dateList[i].events = data.events;
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
    return this.fixedElHeight + 'px';
  }

  seeMore() {
    this.router.navigateByUrl('main/prayer-time/select-diocese');
  }
}
