import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tonggiaophan',
  templateUrl: './tonggiaophan.page.html',
  styleUrls: ['./tonggiaophan.page.scss'],
})
export class TonggiaophanPage implements OnInit {
  title = '(Tổng) Giáo phận';
  list = [
    {
      thumbImage: 'assets/img/tonggiaophan/vatican.svg',
      title: 'Tin tức tòa thánh Vatican',
      desUrl: 'main/tonggiaophan/parish-news'
    },
    {
      thumbImage: 'assets/img/tonggiaophan/hanoi.svg',
      title: 'Tổng giáo phận Hà Nội',
      desUrl: 'main/tonggiaophan/parish-news'
    },
    {
      thumbImage: 'assets/img/tonggiaophan/hue.svg',
      title: 'Tổng giáo phận Huế',
      desUrl: 'main/tonggiaophan/parish-news'
    },
    {
      thumbImage: 'assets/img/tonggiaophan/saigon.svg',
      title: 'Tổng giáo phận Sài Gòn',
      desUrl: 'main/tonggiaophan/parish-news'
    }
  ]

  constructor() {}

  ngOnInit() { }
}
