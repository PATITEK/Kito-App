import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})

export class SettingPage implements OnInit {
  headerCustom = { title: 'Cài đặt' };
  items = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit() { 
    this.setInitData();
  }

  ionViewWillEnter() {
    this.initData();
  }

  setInitData() {
    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', JSON.stringify({ name: "Tiếng Việt", id: 0 }))
    }
    if (!localStorage.getItem('diocese')) {
      localStorage.setItem('diocese', JSON.stringify({ name: "Tổng giáo phận Sài Gòn", id: 3 }))
    }
    if (!localStorage.getItem('parish')) {
      localStorage.setItem('parish', JSON.stringify({ name: "Nhà thờ Thủ Đức", id: 9 }))
    }
  }

  initData() {
    this.items = [
      {
        type: 'language',
        title: "Ngôn ngữ",
        icon: "assets/img/setting/language.svg",
        content: JSON.parse(localStorage.getItem('language')),
        routerLink: '/account-setting/setting/setting-languages'
      },
      {
        type: 'diocese',
        title: "Giáo phận",
        icon: "assets/img/setting/archdiocese.svg",
        content: JSON.parse(localStorage.getItem('diocese')),
        routerLink: '/account-setting/setting'
      },
      {
        type: 'parish',
        title: "Giáo xứ",
        icon: "assets/img/setting/parish.svg",
        content: JSON.parse(localStorage.getItem('parish')),
        routerLink: '/account-setting/setting'
      },
    ];
  }

  goToDetail(item) {
    if (item.type == 'language') {
      this.router.navigateByUrl(item.routerLink);
    } else {
      let data = {
        type: item.type,
        dioceseId: item.type == 'parish' ? this.items[1].content.id : null
      }
      this.router.navigate(['account-setting/setting/select-diocese'], {
        queryParams: {
          data: JSON.stringify(data)
        }
      })
    }
  }
}
