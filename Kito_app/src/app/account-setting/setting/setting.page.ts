import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})

export class SettingPage implements OnInit {
  title = 'Cài đặt'
  items = [];
  constructor(
    private navCtrl: NavController,
    private router: Router
  ) {}

  ngOnInit() {
    this.items = [
      {
        id: 1,
        title: "Ngôn ngữ",
        icon: "assets/img/setting/language.svg",
        temp: localStorage.getItem('language') || '',
        routerLink: "setting-languages"
      },
      {
        id: 2,
        title: "Giáo phận",
        icon: "assets/img/setting/archdiocese.svg",
        temp: "none",
      },
      {
        id: 3,
        title: "Giáo xứ",
        icon: "assets/img/setting/parish.svg",
        temp: "none",
      },
    ]
  }

  ionViewWillEnter() {
    this.items = [
      {
        id: 1,
        title: "Ngôn ngữ",
        icon: "assets/img/setting/language.svg",
        temp: localStorage.getItem('language') || '',
        routerLink: "setting-languages"
      },
      {
        id: 2,
        title: "Giáo phận",
        icon: "assets/img/setting/archdiocese.svg",
        temp: "none",
      },
      {
        id: 3,
        title: "Giáo xứ",
        icon: "assets/img/setting/parish.svg",
        temp: "none",
      },
    ];
  }

  routerLink(path) {
    console.log(path);
    this.router.navigateByUrl(path);
  }
}
