import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  headerCustom = {title: 'Tin tức giáo xứ'};
  constructor() { }
  news = [
    {
      title: 'ĐTC Phanxicô cử hành Thánh lễ Ngày Đời sống Thánh hiến',
      thumbImage: 'assets/img/bgnew.jpg'
    },
    {
      title: 'ĐTC Phanxicô cử hành Thánh lễ Ngày Đời sống Thánh hiến',
      thumbImage: 'assets/img/bgnew.jpg'
    },
    {
      title: 'ĐTC Phanxicô cử hành Thánh lễ Ngày Đời sống Thánh hiến',
      thumbImage: 'assets/img/bgnew.jpg'
    },
    {
      title: 'ĐTC Phanxicô cử hành Thánh lễ Ngày Đời sống Thánh hiến',
      thumbImage: 'assets/img/bgnew.jpg'
    },
  ]
  ngOnInit() {
  }
  // getUrl() {
  //   if (!this.img) {
  //     return `url("https://i.imgur.com/UKNky29.jpg")`
  //   }
  //   else return `url(${this.img})`
  // }
  getUrl() {
   return `url("https://i.imgur.com/UKNky29.jpg")`
  }
}
