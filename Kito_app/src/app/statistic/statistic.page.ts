import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, IonContent, IonButtons } from '@ionic/angular';
import { DateTimeService } from '../@app-core/utils';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.page.html',
  styleUrls: ['./statistic.page.scss'],
})
export class StatisticPage implements OnInit {
  @ViewChild('slides', { static: false }) slides: IonSlides;
  @ViewChild(IonContent, { static: false }) ionContent: IonContent;
  @ViewChild('segment', { static: false }) segment: any;

  headerCustom = { title: 'Thống kê' };
  years = [
    {
      number: 2017,
      months: [],
    },
    {
      number: 2018,
      months: []
    },
    {
      number: 2019,
      months: []
    },
    {
      number: 2020,
      months: []
    },
    {
      number: 2021,
      months: []
    }
  ]
  selectedMonthId;
  selectedYear = this.years[this.years.length - 1].number;
  hasYearOptions = false;

  slideOptions = {
    initialSlide: 0
  };

  constructor(
    public DateTimeService: DateTimeService
  ) { }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.years.forEach(year => {
      let months = [];
      for (let i = 1; i <= 12; i++) {
        const daysInMonth = this.DateTimeService.daysInMonth(i, year.number);
        let dates = [];
        for (let j = 1; j <= daysInMonth; j++) {
          dates.push({
            number: j,
            hasJoin: Math.floor(Math.random() * 2) == 1,
            special: Math.floor(Math.random() * 4) == 1
          })
        }
        months.push({
          id: i - 1,
          name: `Tháng ${i}`,
          dates: dates
        })
      }
      year.months = months;
    })
    this.selectedMonthId = 0;
  }

  calJoinedEvents(dates) {
    return dates.reduce((acc, cur) => cur.hasJoin ? ++acc : acc, 0);
  }

  calJoinedSpecialEvents(dates) {
    return dates.reduce((acc, cur) => cur.special && cur.hasJoin ? ++acc : acc, 0);
  }

  calSpecialEvents(dates) {
    return dates.reduce((acc, cur) => cur.special ? ++acc : acc, 0);
  }

  scrollToTop(value) {
    this.ionContent.scrollToTop(value);
  }

  changeSegment(id, event) {
    const offsetLeft = event.target.offsetLeft;
    const offsetWidth = event.target.offsetWidth;
    const segmentOffsetWidth = this.segment.el.offsetWidth;
    this.segment.el.scroll(offsetLeft - segmentOffsetWidth / 2 + offsetWidth / 2, 0);
    this.slides.lockSwipes(false).then(() => {
      this.slides.slideTo(id).then(() => {
        this.changeSlide(id);
        this.slides.lockSwipes(true);
      });
    })
  }

  changeSlide(id) {
    this.selectedMonthId = id;
  }

  toggleHasYearOptions(bool) {
    this.hasYearOptions = bool;
  }

  disableSwipe() {
    this.slides.lockSwipes(true);
  }

  changeYear(year) {
    event.stopPropagation();
    if (this.selectedYear != year.number) {
      this.selectedYear = year.number;
      this.selectedMonthId = 0;
    }
    this.toggleHasYearOptions(false);
  }

  onScrollContent(event) {
    this.toggleHasYearOptions(false);
  }
}