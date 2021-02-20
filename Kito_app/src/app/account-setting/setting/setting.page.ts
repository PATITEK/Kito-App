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

  constructor(
    private navCtrl: NavController,
    private router: Router
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.items = [
      {
        id: 1,
        title: "Ngôn ngữ",
        icon: "language",
        temp: localStorage.getItem('language') || '',
        routerLink: "setting-languages"
      },
      {
        id: 2,
        title: "Giáo phận",
        icon: "",
        temp: "none",
      },
      {
        id: 3,
        title: "Giáo xứ",
        icon: "",
        temp: "none",
      },
    ];
  }

  routerLink(path) {
    console.log(path);
    this.router.navigateByUrl(path);
  }

  items = [
    {
      id: 1,
      title: "Ngôn ngữ",
      icon: "language",
      temp: localStorage.getItem('language') || '',
      routerLink: "setting-languages"
    },
    {
      id: 2,
      title: "Giáo phận",
      icon: "",
      temp: "none",
    },
    {
      id: 3,
      title: "Giáo xứ",
      icon: "",
      temp: "none",
    },
  ];

}
