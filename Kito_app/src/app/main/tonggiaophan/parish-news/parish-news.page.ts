import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parish-news',
  templateUrl: './parish-news.page.html',
  styleUrls: ['./parish-news.page.scss'],
})
export class ParishNewsPage implements OnInit {
  list = [
    {
      heading: 'Tin tức TÒA THÁNH VATICAN',
      desUrl: 'main/tonggiaophan/parish-news/news',
      items: [
        {
          id: "1",
          type: 'News',
          title: 'ĐTC Phanxicô cử hành Thánh lễ Ngày Đời sống Thánh hiến',
          thumbImage: 'assets/img/parish-item.svg'
        },
        {
          id: "2",
          type: 'News',
          title: 'ĐTC Phanxicô cử hành Thánh lễ Ngày Đời sống Thánh hiến',
          thumbImage: 'assets/img/parish-item.svg'
        },
        {
          id: "3",
          type: 'News',
          title: 'ĐTC Phanxicô cử hành Thánh lễ Ngày Đời sống Thánh hiến',
          thumbImage: 'assets/img/parish-item.svg'
        },
        {
          id: "4",
          type: 'News',
          title: 'ĐTC Phanxicô cử hành Thánh lễ Ngày Đời sống Thánh hiến',
          thumbImage: 'assets/img/parish-item.svg'
        },
      ]
    },
    {
      heading: 'Tiểu sử các ĐỨC GIÁO HOÀNG',
      desUrl: 'main/tonggiaophan/parish-news/stories',
      items: [
        {
          id: "1",
          type: 'Story',
          title: 'Giáo hoàng Phanxicô - Đương kim giáo hoàng',
          thumbImage: 'assets/img/pope.svg'
        },
        {
          id: "2",
          type: 'Story',
          title: 'Giáo hoàng Phanxicô - Đương kim giáo hoàng',
          thumbImage: 'assets/img/pope.svg'
        },
        {
          id: "3",
          type: 'Story',
          title: 'Giáo hoàng Phanxicô - Đương kim giáo hoàng',
          thumbImage: 'assets/img/pope.svg'
        },
        {
          id: "4",
          type: 'Story',
          title: 'Giáo hoàng Phanxicô - Đương kim giáo hoàng',
          thumbImage: 'assets/img/pope.svg'
        },
      ]
    }
  ]

  constructor() { }

  ngOnInit() {
   
   }
}
