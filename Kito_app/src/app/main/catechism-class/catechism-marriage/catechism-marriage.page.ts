import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catechism-marriage',
  templateUrl: './catechism-marriage.page.html',
  styleUrls: ['./catechism-marriage.page.scss'],
})
export class CatechismMarriagePage implements OnInit {
  title = 'Giáo lý hôn nhân';
  list = [];

  constructor() { }

  ngOnInit() {
    const rand = Math.floor(Math.random() * (20 - 1 + 1) + 1);
    for (let i = 0; i < rand; i++) {
      this.list.push({
        name: `Giáo lý hôn nhân ${i + 1}`,
        time: '7h30 - 9h30',
        day: 'Chủ nhật hàng tuần',
        room: 'Phòng học 01'
      })
    }
  }
}
