import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { DateTimeService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-prayer-time',
  templateUrl: './prayer-time.page.html',
  styleUrls: ['./prayer-time.page.scss'],
})
export class PrayerTimePage implements OnInit {
  @ViewChild('slides', { static: false }) slides: IonSlides;

  slideOptions = {
    initialSlide: 0,
    autoHeight: true
  };

  parish = {
    thumbImage: 'assets/img/tonggiaophan/hanoi.svg',
    name: 'Giáo xứ Chánh Tòa Sài Gòn'
  }

  dateList = [];
  activeDateItemId;

  parishNameHeight = 0;

  constructor(
    public dateTimeService: DateTimeService,
    private router: Router
  ) {
    this.initDateList();
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const dateItemId = localStorage.getItem('dateItemId');
    if (dateItemId) {
      this.changeSegment(dateItemId);
      localStorage.removeItem('dateItemId');  
    }
  }

  ionViewDidEnter() {
    const parishNameElement : any = document.querySelector('.parish-name');
    this.parishNameHeight = parishNameElement.offsetHeight;
  }

  initDateList() {
    const now = new Date();
    for (let i = 0; i < 7; i++) {
      let nextDay = new Date(now);
      nextDay.setDate(nextDay.getDate() + i);

      let events = [];
      const randNum = Math.floor(Math.random() * 6);
      for (let i = 0; i < randNum; i++) {
        events.push({
          name: 'Lễ sáng',
          time: '5:00',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur ducimus aliquam deleniti enim architecto optio rerum exercitationem perferendis aperiam aliquid.'
        })
      }

      this.dateList.push({
        id: i,
        day: nextDay,
        name: 'Đức Mẹ hồn lìa xác lên trời',
        events: events
      })
    }
    this.activeDateItemId = this.dateList[0].id;
  }

  changeDateItem(id) {
    this.activeDateItemId = id;
  }

  changeSegmentSlide() {
    this.slides.getActiveIndex().then(index => {
      this.changeDateItem(index);
    })
  }

  changeSegment(id) {
    this.slides.slideTo(id).then(() => this.changeDateItem(id));
  }

  goToEventDetail(dateItem, event) {
    const data = {
      dateList: this.dateList,
      dateItem: dateItem,
      event: event
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
