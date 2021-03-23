import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catechism-rcia',
  templateUrl: './catechism-rcia.page.html',
  styleUrls: ['./catechism-rcia.page.scss'],
})
export class CatechismRciaPage implements OnInit {
  headerCustom = {title: 'Giáo lý dự tòng'};
  list = [];

  constructor() { }

  ngOnInit() {
    const rand = Math.floor(Math.random() * (20 - 1 + 1) + 1);
    for (let i = 0; i < rand; i++) {
      this.list.push({
        name: `Giáo lý dự tòng ${i + 1}`,
        time: '7h30 - 9h30',
        day: 'Chủ nhật hàng tuần',
        room: 'Phòng học 01',
        canRegister: Math.floor(Math.random() * 2) == 0
      })
    }
  }

}
