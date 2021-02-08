import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  title = 'Thông tin';

  news = [
    {
      id: "1",
      title: 'ĐTC Phanxicô cử hành Thánh lễ Ngày Đời sống Thánh hiến',
      thumbImage: 'assets/img/parish-item.svg',
      watchedUsers: 1024,
      time: '17:15  03.02.2021'
    },
    {
      id: "2",
      title: 'ĐTC Phanxicô cử hành Thánh lễ Ngày Đời sống Thánh hiến',
      thumbImage: 'assets/img/parish-item.svg',
      watchedUsers: 1024,
      time: '17:15  03.02.2021'
    },
    {
      id: "3",
      title: 'ĐTC Phanxicô cử hành Thánh lễ Ngày Đời sống Thánh hiến',
      thumbImage: 'assets/img/parish-item.svg',
      watchedUsers: 1024,
      time: '17:15  03.02.2021'
    },
    {
      id: "4",
      title: 'ĐTC Phanxicô cử hành Thánh lễ Ngày Đời sống Thánh hiến',
      thumbImage: 'assets/img/parish-item.svg',
      watchedUsers: 1024,
      time: '17:15  03.02.2021'
    }
  ]

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToNewsDetail(item) {
    const data = {
      id: item.id,
      type: 'News'
    }
    this.router.navigate(['/news-detail'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }
}
