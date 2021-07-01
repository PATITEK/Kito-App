import { LoadingService } from 'src/app/@app-core/utils';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { CalendarService } from 'src/app/@app-core/http';
import { IPageCalendar } from 'src/app/@app-core/http/calendar/calendar.DTO';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  @ViewChild('slides', { static: false }) slides: IonSlides;
  @ViewChild('slidesModal', { static: false }) slidesModal: IonSlides;

  headerCustom = { title: 'Lịch Công Giáo' };
  pageReq: IPageCalendar = {
    cal_date: null
  };
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoHeight: true
  };
  months = [];
  currentDate = new Date();
  hasFilter = false;

  hasModal = false;

  DATES = [
    'Chúa nhật',
    'Thứ hai',
    'Thứ ba',
    'Thứ tư',
    'Thứ năm',
    'Thứ sáu',
    'Thứ bảy',
  ]

  constructor(
    private route: Router,
    private calendarService: CalendarService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadingService.present();
    this.getYear(this.currentDate.getFullYear(), true);
  }

  checkRightMonthAndYear(date1: Date, date2: Date) {
    return date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
  }

  getCurrentMonthIndex() {
    return this.months.findIndex(month => this.checkRightMonthAndYear(month[15].date, this.currentDate));
  }

  getYear(year, firstLoad?) {
    let dataYear = [];
    for (let i = 1; i <= 12; i++) {
      this.pageReq.cal_date = new Date(year, i);
      const month = this.calendarService.getByMonth(this.pageReq);
      dataYear.push(month);
    }

    forkJoin(dataYear).subscribe(data => {
      data.forEach((month: any) => {
        month = month.calendars;
        month.forEach(day => {
          day.date = new Date(day.date);
          day.lunar_date = new Date(day.lunar_date);
          day.isSolemnity = Math.floor(Math.random() * 3) === 1;
        })

        // remove redundant weeks
        // while (true) {
        //   if (!this.checkRightMonthAndYear(month[month.length - 7].date, month[7].date)) {
        //     month.splice(month.length - 7, 7);
        //   } else {
        //     break;
        //   }
        // }

        if (year >= this.currentDate.getFullYear()) {
          this.months.push(month)
        } else {
          this.months.unshift(month);
        }
      })

      firstLoad && this.slides.slideTo(this.getCurrentMonthIndex()).then(() => {
        this.currentDate = new Date();
        this.loadingService.dismiss();
      })
    }, () => {
      this.loadingService.dismiss();
    })
  }

  checkStartMonth() {
    return this.getCurrentMonthIndex() <= 0;
  }

  checkEndMonth() {
    return this.getCurrentMonthIndex() >= this.months.length - 1;
  }

  prevMonth() {
    if (!this.checkStartMonth()) {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.slides.slideTo(this.getCurrentMonthIndex());
    }
  }

  nextMonth() {
    if (!this.checkEndMonth()) {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.slides.slideTo(this.getCurrentMonthIndex());
    }
  }

  changeCurrentDate() {
    this.slides.getActiveIndex().then(index => {
      const absolute = index - this.getCurrentMonthIndex();
      this.currentDate.setMonth(this.currentDate.getMonth() + absolute);
    })
  }

  toggleHasFilter() {
    this.hasFilter = !this.hasFilter;
  }

  setHasFilter(bool) {
    this.hasFilter = bool;
  }

  openDetailModal(date) {
    this.hasFilter = false;
    const index = this.getDates().findIndex(d => {
      return d.date.getFullYear() === date.date.getFullYear()
        && d.date.getMonth() === date.date.getMonth()
        && d.date.getDate() === date.date.getDate()
    });
    this.slidesModal.slideTo(index, 0).then(() => this.hasModal = true);
  }

  getDateString(date: Date) {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  }

  toggleHasModal() {
    this.hasModal = !this.hasModal;
  }

  getDates() {
    return this.months.reduce((dates, month) => [...dates, ...month.filter(date => this.checkRightMonthAndYear(date.date, month[12].date))], [])
  }
}
