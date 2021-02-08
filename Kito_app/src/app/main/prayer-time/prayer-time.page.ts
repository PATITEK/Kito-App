import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DateTimeService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-prayer-time',
  templateUrl: './prayer-time.page.html',
  styleUrls: ['./prayer-time.page.scss'],
})
export class PrayerTimePage implements OnInit {
  parish = {
    thumbImage: 'assets/img/tonggiaophan/hanoi.svg',
    name: 'Giáo xứ Chánh Tòa Sài Gòn'
  }

  dateList = [];
  activeDateItem;

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
      this.activeDateItem = dateItemId;
      localStorage.removeItem('dateItemId');  
    }
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
    this.activeDateItem = this.dateList[0].id;
  }

  changeDateItem(dateItem) {
    this.activeDateItem = dateItem.id;
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
}
