import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, IPageRequest, VaticanService } from '../@app-core/http';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { AccountService } from '../@app-core/http/account/account.service';
import { GeolocationService, ImageService, OneSignalService } from '../@app-core/utils';

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
      desUrl: 'main/news',
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

  news = [];
  pageRequestVatican: IPageRequest = {
    page: 1,
    per_page: 10
  }

  constructor(
    private router: Router,
    private OneSignalService: OneSignalService,
    private imageService: ImageService,
    private accountService: AccountService,
    private authService: AuthService,
    public modalCtrl: ModalController,
    public vaticanService: VaticanService
  ) { }
  request: IPageRequest = {
    page: 1,
    per_page: 100
  }
  data;
  ionViewWillEnter() {
    this.name = localStorage.getItem('fullname');
    // this.imageService.getImage();
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
    this.OneSignalService.startOneSignal();
    this.name = localStorage.getItem('fullname');
    this.getListVatican();
  }
  getListVatican() {
    this.vaticanService.getAll(this.request).subscribe(data => {
        this.data = data.vatican_news;
        // console.log(this.data);
        // if(this.data) {}
    })
  }

  // length = 0;
  // const list = document.getElementById('list');
  // const infiniteScroll = document.getElementById('infinite-scroll');

  // infiniteScroll.addEventListener('ionInfinite', async function () {
  //   if (length < this.data.length) {
  //     console.log('Loading data...');
  //     await wait(500);
  //     this.infinityScroll.complete();
  //     appendItems(3);
  //     console.log('Done');
  //   } else {
  //     console.log('No More Data');
  //     this.infinityScroll.disabled = true;
  //   }
  // });

  // function appendItems(number) {
  //   console.log('length is', length);
  //   const originalLength = length;
  //   for (var i = 0; i < number; i++) {
  //     const el = document.createElement('ion-item');
  //     el.innerHTML = `
  //       <ion-avatar slot="start">
  //         <img src="${this.thumbImage}">
  //       </ion-avatar>
  //       <ion-label>
  //         ${this.data.title}
  //       </ion-label>
  //     `;
  //     list.appendChild(el);
  //     length++;
  //   }
  // }

  // function wait(time) {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //     }, time);
  //   });
  // }

  // appendItems(20);

  goToDetail(item) {
    if (item.desUrl == 'donate') {
      const data = {
        type: 'donate'
      }
      this.authService.sendData(data)
    }
    else if (item.desUrl == 'pray') {
      const data = {
        type: 'pray'
      }
      this.authService.sendData(data)
    }
    this.router.navigateByUrl(item.desUrl);
  }

  goToNewsDetail(item) {
    const data = {
      id: item.id,
      type: {
        general: 'news',
        detail: 'vatican'
      }
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
