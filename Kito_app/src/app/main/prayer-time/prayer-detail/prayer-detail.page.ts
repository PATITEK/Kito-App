import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
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
  event: any;

  constructor(
    private route: ActivatedRoute,
    public dateTimeService: DateTimeService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.route.queryParams.subscribe(params => {
      this.dateList = JSON.parse(params['data']).dateList;
      this.dateList.forEach(dateItem => dateItem.day = new Date(dateItem.day));
     
      
      this.dateItem = JSON.parse(params['data']).dateItem;
      console.log(this.dateItem);
      this.dateItem.day = new Date(this.dateItem.day)
      
      this.event = JSON.parse(params['data']).event;
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
