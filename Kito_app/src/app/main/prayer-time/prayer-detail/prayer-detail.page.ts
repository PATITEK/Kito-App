import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { EventsService } from 'src/app/@app-core/http';
import { DateTimeService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-prayer-detail',
  templateUrl: './prayer-detail.page.html',
  styleUrls: ['./prayer-detail.page.scss'],
})
export class PrayerDetailPage implements OnInit {
  title = 'Chi tiết Bài đọc';
  dateList = [];
  dateItem: any;
  event = {
    description: ''
  }

  constructor(
    private route: ActivatedRoute,
    public dateTimeService: DateTimeService,
    private navCtrl: NavController,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.route.queryParams.subscribe(params => {
      this.dateList = JSON.parse(params['data']).dateList;
      this.dateList.forEach(dateItem => dateItem.date = new Date(dateItem.date));

      this.eventsService.getDetail(JSON.parse(params['data']).eventId).subscribe(data => {
        this.event = data.event;
      })

      this.dateItem = JSON.parse(params['data']).dateItem;
      this.dateItem.date = new Date(this.dateItem.date)
    }).unsubscribe();
  }

  changeDateItem(dateItem) {
    if (dateItem.id == this.dateItem.id) {
      return;
    }
    localStorage.setItem('dateItemId', dateItem.id);
    this.navCtrl.back();
  }
}
