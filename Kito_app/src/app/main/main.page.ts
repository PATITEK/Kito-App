import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../@app-core/http';
import { AccountService } from '../@app-core/http/account/account.service';
import { ImageService, OneSignalService } from '../@app-core/utils';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  name = '';
  avatar = '';
  previousUrl = '';
  menu = [
    {
      name: '(Tổng) Giáo phận',
      thumbImage: 'assets/img/menu/tonggiaophan.svg',
      desUrl: 'main/tonggiaophan',
      fullWidth: true
    },
    {
      name: 'Tin tức giáo xứ',
      thumbImage: 'assets/img/menu/tintuc.svg',
      desUrl: 'main/tonggiaophan',
    },
    {
      name: 'Chi tiết giờ lễ',
      thumbImage: 'assets/img/menu/chitietgiole.svg',
      desUrl: 'main/prayer-time',
    },
    {
      name: 'Lớp học Giáo lý',
      thumbImage: 'assets/img/menu/lophocgiaoly.svg',
      desUrl: 'main/catechism-class',
    },
    {
      name: 'Đóng góp',
      thumbImage: 'assets/img/menu/donggop.svg',
      desUrl: 'donate',
    },
    {
      name: 'Xin lễ',
      thumbImage: 'assets/img/menu/xinle.svg',
      desUrl: 'pray',
    },
    {
      name: 'Cửa hàng',
      thumbImage: 'assets/img/menu/cuahang.svg',
      desUrl: 'main/store',
    },
  ]

  news = [
    {
      title: 'ĐTC Phanxicô cử hành Thánh lễ Ngày Đời sống Thánh hiến',
      thumbImage: 'assets/img/bgnew.jpg'
    },
    {
      title: 'ĐTC Phanxicô cử hành Thánh lễ Ngày Đời sống Thánh hiến',
      thumbImage: 'assets/img/bgnew.jpg'
    },
    {
      title: 'ĐTC Phanxicô cử hành Thánh lễ Ngày Đời sống Thánh hiến',
      thumbImage: 'assets/img/bgnew.jpg'
    },
    {
      title: 'ĐTC Phanxicô cử hành Thánh lễ Ngày Đời sống Thánh hiến',
      thumbImage: 'assets/img/bgnew.jpg'
    },
  ]

  constructor(
    private router: Router,
    private OneSignalService: OneSignalService,
    private imageService: ImageService,
    private accountService: AccountService,
    private authService: AuthService
  ) { }
  ionViewWillEnter() {
    // this.imageService.getImage();
    this.accountService.getAccounts().subscribe(data => {
      if(data.app_user.thumb_image == null) {
        data.app_user['thumb_image'] = "https://i.imgur.com/edwXSJa.png";
        this.avatar = data.app_user.thumb_image;
      }
      else if( data.app_user.thumb_image.url == null) {
        data.app_user['thumb_image'] = "https://i.imgur.com/edwXSJa.png";
        this.avatar = data.app_user.thumb_image;
      }
      else {
        this.avatar =  data.app_user.thumb_image.url;
      }
  })
}

  ngOnInit() {
    this.OneSignalService.startOneSignal();
    this.name = localStorage.getItem('fullname');
   
  }
  routerLink(path) {
    this.router.navigateByUrl(path);
  } 

  goToDetail(item) {
    this.router.navigateByUrl(item.desUrl);
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

  goToAccountSetting() {
    this.router.navigateByUrl('account-setting');
  }
}
