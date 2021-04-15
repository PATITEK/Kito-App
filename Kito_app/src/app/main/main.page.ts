import { DioceseService } from './../@app-core/http/diocese/diocese.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, ParishesService, VaticanService } from '../@app-core/http';
import { AlertController, IonInfiniteScroll, ModalController, NavController, Platform } from '@ionic/angular';
import { AccountService } from '../@app-core/http/account/account.service';
import { GeolocationService, LoadingService, OneSignalService, ToastService } from '../@app-core/utils';
import { IPageVatican } from '../@app-core/http/vatican/vatican.DTO';
import { IPageRequest } from 'src/app/@app-core/http/global/global.DTO';
import { IPageParishes } from 'src/app/@app-core/http/parishes/parishes.DTO';

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
    // heading: '',
    items: [],
    type: { general: 'news', detail: 'vatican' }
  }
  subscribe: any;
  public alertPresented = false;
  count = 0;
  interval: any;
  pageRequestDioceses: IPageRequest = {}
  pageRequestParishes: IPageParishes = {
    diocese_id: 0,
  }
  constructor(
    private router: Router,
    private OneSignalService: OneSignalService,
    private accountService: AccountService,
    private authService: AuthService,
    public modalCtrl: ModalController,
    public vaticanService: VaticanService,
    private loading: LoadingService,
    private platform: Platform,
    private alertController: AlertController,
    private toarst: ToastService,
    private navController: NavController,
    private geolocationSerivce: GeolocationService,
    private diocesesService: DioceseService,
    private parishesService: ParishesService,
  ) { }

  ionViewWillEnter() {
    clearInterval(this.interval);
    this.reTakeLocation();
    this.checkAvatar();
  }
  ngOnInit() {
    this.OneSignalService.startOneSignal();
    this.getVatican();
    this.blockBackBtn();
  }

  checkAvatar() {
    this.name = localStorage.getItem('fullname');
    this.accountService.getAccounts().subscribe(data => {
      this.name = data.app_user.full_name;
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

  blockBackBtn() {
    this.subscribe = this.platform.backButton.subscribeWithPriority(99999, () => {
      if (this.router.url === '/main') {
        this.count++;
        if (this.count == 1) {
          this.toarst.presentSuccess('Nhấn lần nữa để thoát!');
        }
        else {
          navigator['app'].exitApp();
        }
        setTimeout(() => {
          this.count = 0;
        }, 2000);
      }
      else {
        this.navController.back();
      }
    })
  }

  reTakeLocation() {
    this.diocesesService.getAll(this.pageRequestDioceses).subscribe(data => {
      const totalDioceses = data.meta.pagination.per_page;
      for (let i = 1; i <= totalDioceses; i++) {
        this.pageRequestParishes.diocese_id += 1;
        this.parishesService.getAll(this.pageRequestParishes).subscribe(data => {
          let i = 0;
          this.interval = setInterval(() => {
            this.geolocationSerivce.getCurrentLocationNoLoading();
            localStorage.setItem('address', this.geolocationSerivce.customerLocation.address);
            localStorage.setItem('lat', this.geolocationSerivce.centerService.lat.toFixed(5).toString());
            localStorage.setItem('lng', this.geolocationSerivce.centerService.lng.toFixed(5).toString());
            for (let parish of data.parishes) {
              let tempDistance = this.geolocationSerivce.distanceFromUserToPointMet(
                localStorage.getItem('lat'),
                localStorage.getItem('lng'),
                parish.location.lat,
                parish.location.long,
              )
              parish.attention_log = {};
              parish.attention_log.distance = tempDistance;
              if (parish.attention_log.distance < 20) {
                parish.attention_log.isCouldJone = true;
              } else parish.attention_log.isCouldJoin = false;
            }
            if (i == 99) {
              i = 0;
              console.clear();
            }
            i++;
          }, 3000)
        })
        break;
      }
      this.pageRequestParishes.diocese_id = 0;
    })
  }
  async presentAlert() {
    this.alertPresented = true;
    const alert = await this.alertController.create({
      cssClass: 'logout-alert',
      message: 'Bạn có muốn thoát app ?',
      buttons: [
        {
          text: 'Đồng ý',
          handler: () => {
            navigator['app'].exitApp();
          }
        },
        {
          text: 'Hủy',

          handler: () => {
            this.alertPresented = false;
            return;
          }
        },
      ]
    });
    await alert.present();
  }

  getVatican() {
    const pageRequest: IPageVatican = {
      page: 1,
      per_page: 4,
      category_id: 2
    }
    this.vaticanService.getAll(pageRequest).subscribe(data => {
      this.loading.dismiss();
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
