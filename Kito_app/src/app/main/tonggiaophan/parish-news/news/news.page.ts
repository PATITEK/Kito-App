import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  @ViewChild('searchBar') searchBar: any;

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
  
  hiddenSearchBar = true;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  toggleHideSearchBar(value) {
    event.stopPropagation();
    this.hiddenSearchBar = value;
    if (!value) {
      this.searchBar.setFocus();
    }
  }

  goToNewsDetail(item) {
    const data = {
      id: item.id
    }
    this.router.navigate(['main/tonggiaophan/parish-news/news/news-detail'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }
}
