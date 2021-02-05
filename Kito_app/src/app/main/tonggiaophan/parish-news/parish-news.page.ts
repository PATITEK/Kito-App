import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parish-news',
  templateUrl: './parish-news.page.html',
  styleUrls: ['./parish-news.page.scss'],
})
export class ParishNewsPage implements OnInit {
  news = [
    {
      id: "1",
      title: 'ĐTC Phanxicô cử hành Thánh lễ Ngày Đời sống Thánh hiến',
      thumbImage: 'assets/img/parish-item.svg'
    },
    {
      id: "2",
      title: 'ĐTC Phanxicô cử hành Thánh lễ Ngày Đời sống Thánh hiến',
      thumbImage: 'assets/img/parish-item.svg'
    },
    {
      id: "3",
      title: 'ĐTC Phanxicô cử hành Thánh lễ Ngày Đời sống Thánh hiến',
      thumbImage: 'assets/img/parish-item.svg'
    },
    {
      id: "4",
      title: 'ĐTC Phanxicô cử hành Thánh lễ Ngày Đời sống Thánh hiến',
      thumbImage: 'assets/img/parish-item.svg'
    }
  ]

  stories = [
    {
      id: "1",
      title: `Giáo hoàng Phanxicô - Đương kim giáo hoàng`,
      thumbImage: 'assets/img/pope.svg'
    },
    {
      id: "2",
      title: `Giáo hoàng Phanxicô - Đương kim giáo hoàng`,
      thumbImage: 'assets/img/pope.svg'
    },
    {
      id: "3",
      title: `Giáo hoàng Phanxicô - Đương kim giáo hoàng`,
      thumbImage: 'assets/img/pope.svg'
    },
    {
      id: "4",
      title: `Giáo hoàng Phanxicô - Đương kim giáo hoàng`,
      thumbImage: 'assets/img/pope.svg'
    }
  ]

  slideOptions = {
    initialSlide: 0,
    loop: true,
    autoplay: {
      disableOnInteraction: false
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
