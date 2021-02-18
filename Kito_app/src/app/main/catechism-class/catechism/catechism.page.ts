import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-catechism',
  templateUrl: './catechism.page.html',
  styleUrls: ['./catechism.page.scss'],
})
export class CatechismPage implements OnInit {
  @ViewChild('slides', { static: false }) slides: IonSlides;

  title = 'Giáo lý 1-12';
  menuItems = [
    {
      id: 0,
      name: 'Khai tâm',
      list: []
    },
    {
      id: 1,
      name: 'Rước lễ',
      list: []
    },
    {
      id: 2,
      name: 'Thêm sức',
      list: []
    },
    {
      id: 3,
      name: 'Bao đồng',
      list: []
    }
  ];
  currentMenuItemId = this.menuItems[0].id || '';

  slideOptions = {
    initialSlide: 0,
    autoHeight: true
  };

  constructor() { }

  ngOnInit() {
    this.menuItems.forEach(item => {
      const rand = Math.floor(Math.random() * (10 - 1 + 1) + 1);
      for (let i = 0; i < rand; i++) {
        item.list.push({
          name: `${item.name} ${i + 1}`,
          time: '7h30 - 9h30',
          day: 'Chủ nhật hàng tuần',
          room: 'Phòng học 01'
        })
      }
    })
  }

  changeSegment(id) {
    this.slides.slideTo(id).then(() => this.changeSlide(id));
  }

  changeSlide(id) {
    this.currentMenuItemId = id;
  }

  changeSegmentSlide() {
    this.slides.getActiveIndex().then(index => {
      this.changeSlide(index);
    })
  }
}
