import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})

export class SettingPage implements OnInit {
  headerCustom = { title: 'Cài đặt' };
  items = [];
  language = { name:"Tiếng Việt", id: 0}

  constructor() { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.initData();
  }

  initData() {
    if(localStorage.getItem('language') == null) {
      localStorage.setItem('language', JSON.stringify(this.language))
    }
    this.items = [
      {
        id: 1,
        title: "Ngôn ngữ",
        icon: "assets/img/setting/language.svg",
        content: JSON.parse(localStorage.getItem('language')).name || '',
        routerLink: '/account-setting/setting/setting-languages'
      },
      {
        id: 2,
        title: "Giáo phận",
        icon: "assets/img/setting/archdiocese.svg",
        content: '',
        routerLink: 'account-setting/setting'
      },
      {
        id: 3,
        title: "Giáo xứ",
        icon: "assets/img/setting/parish.svg",
        content: '',
        routerLink: '/account-setting/setting'
      },
    ];
  }
}
