import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, IPageRequest, VaticanService } from '../@app-core/http';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { AccountService } from '../@app-core/http/account/account.service';
import { OneSignalService } from '../@app-core/utils';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infinityScroll: IonInfiniteScroll;
  name = '';
  avatar = '';
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
      desUrl: 'news',
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
      name: 'Lịch Công giáo',
      thumbImage: 'assets/img/menu/lichconggiao.svg',
      desUrl: 'main/calendar',
    },
    {
      name: 'Cửa hàng',
      thumbImage: 'assets/img/menu/cuahang.svg',
      desUrl: 'main/store',
    },
    {
      name: 'Nhạc Thánh Ca',
      thumbImage: 'assets/img/menu/thanhca.svg',
      desUrl: 'main/hymn-music',
    },
    {
      name: 'Video bài giảng',
      thumbImage: 'assets/img/menu/baigiang.svg',
      desUrl: 'main/hymn-video',
    },
  ]

  vaticanList = {
    heading: '',
    items: [],
    type: { general: 'news', detail: 'vatican' }
  }

  constructor(
    private router: Router,
    private OneSignalService: OneSignalService,
    private accountService: AccountService,
    private authService: AuthService,
    public modalCtrl: ModalController,
    public vaticanService: VaticanService,
  ) { }

  ionViewWillEnter() {
    this.name = localStorage.getItem('fullname');
    this.accountService.getAccounts().subscribe(data => {
      if (data.app_user.thumb_image == null) {
        data.app_user['thumb_image'] = "https://i.imgur.com/edwXSJa.png";
        this.avatar = data.app_user.thumb_image;
        localStorage.setItem('avatar', this.avatar);
      }
      else if (data.app_user.thumb_image.url == null) {
        data.app_user['thumb_image'] = "https://i.imgur.com/edwXSJa.png";
        this.avatar = data.app_user.thumb_image;
        localStorage.setItem('avatar', this.avatar);
      }
      else {
        this.avatar = data.app_user.thumb_image.url;
        localStorage.setItem('avatar', this.avatar);
      }
    })
  }

  ngOnInit() {
    // this.OneSignalService.startOneSignal();
    this.name = localStorage.getItem('fullname');
    this.getVatican();
  }

  getVatican() {
    const pageRequest: IPageRequest = {
      page: 1,
      per_page: 4
    }
    this.vaticanService.getAll(pageRequest).subscribe(data => {
      data.vatican_news.forEach(v => v.type = this.vaticanList.type);
      this.vaticanList.items = data.vatican_news;
    })
  }

  goToDetail(item) {
    if (item.desUrl == 'donate') {
      const data = {
        type: 'donate'
      }
      this.authService.sendData(data)
      this.router.navigateByUrl(item.desUrl);

    }
    else if (item.desUrl == 'pray') {
      const data = {
        type: 'pray'
      }
      this.authService.sendData(data)
      this.router.navigateByUrl(item.desUrl);

    }
    else if (item.desUrl == 'news') {
      const data = {
        id: localStorage.getItem('parish_id'),
        type: {
          detail: 'parish_news',
          general: 'news'
        }

      }
      this.router.navigate(['/news'], {
        queryParams: {
          data: JSON.stringify(data)
        }
      })
    }
    else this.router.navigateByUrl(item.desUrl);
  }

  goToAccountSetting() {
    this.router.navigateByUrl('account-setting');
  }
}
