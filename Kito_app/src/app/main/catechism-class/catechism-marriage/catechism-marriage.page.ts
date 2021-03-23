import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catechism-marriage',
  templateUrl: './catechism-marriage.page.html',
  styleUrls: ['./catechism-marriage.page.scss'],
})
export class CatechismMarriagePage implements OnInit {
  headerCustom = { title: 'Giáo lý hôn nhân' };
  list = [];

  constructor(private route: ActivatedRoute,) { }

  ngOnInit() {
    this.getDataName();
  }
  getDataName() {
    this.route.queryParams.subscribe(data => {
      this.headerCustom = { title: data.data };
      const rand = Math.floor(Math.random() * (20 - 1 + 1) + 1);
      for (let i = 1; i <= rand; i++) {
        this.list.push({
          name: data.data + ' ' + i,
          time: '7h30 - 9h30',
          day: 'Chủ nhật hàng tuần',
          room: 'Phòng học 01',
          canRegister: Math.floor(Math.random() * 2) == 0
        })
      }
    })
  }
}
