import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  tabNew = true;
  title = 'Tin tức giáo xứ';
  headerCustom = { title: 'Tin tức giáo xứ', background: '#e5e5e5' };
  constructor(
    private router: Router
  ) { }
  news = [
    {
      title: 'ĐTC Phanxicô cử hành Thánh lễ Ngày Đời sống Thánh hiến',
      thumbImage: 'assets/img/bgnew.jpg',
      id: 1
    },
    {
      title: 'ĐTC Phanxicô cử hành Thánh lễ Ngày Đời sống Thánh hiến',
      thumbImage: 'assets/img/bgnew.jpg',
      id: 2
    },
    {
      title: 'ĐTC Phanxicô cử hành Thánh lễ Ngày Đời sống Thánh hiến',
      thumbImage: 'assets/img/bgnew.jpg',
      id: 3
    },
    {
      title: 'ĐTC Phanxicô cử hành Thánh lễ Ngày Đời sống Thánh hiến',
      thumbImage: 'assets/img/bgnew.jpg',
      id: 4
    },
  ]
  ngOnInit() {
  }
  changeTabs() {
    if (this.tabNew) {
      this.tabNew = false;
    }
    else {
      this.tabNew = true;
    }
  }
  counter(i: number) {
    return new Array(i);
  }
  getAllParish() {
    
  }
  getUrl() {
    return `url("https://i.imgur.com/UKNky29.jpg")`
  }
  goToStoryDetail() {

  }

  goToNewsDetail() {
    const data = {
      type: {
        general: 'news',
        detail: 'parish',
      }
    }
    this.router.navigate(['/news'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }
}
