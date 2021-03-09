import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { AccountService } from '../@app-core/http/account/account.service';
import { GeolocationService, ImageService } from '../@app-core/utils';
import { PopupComponent } from '../@modular/popup/popup.component';
import { PopuplogoutComponent } from '../@modular/popuplogout/popuplogout.component';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.page.html',
  styleUrls: ['./account-setting.page.scss'],
})
export class AccountSettingPage implements OnInit {
  headerCustom = { title: 'Thiết lập tài khoản' };
  name = localStorage.getItem('fullname') || '';
  avatar = '';

  // list = [
  //   {
  //     name: 'Thông tin cá nhân',
  //     ionUrl: 'assets/icon/user.svg',
  //     desUrl: 'account'
  //   },
  //   {
  //     name: 'Thống kê',
  //     ionUrl: 'assets/icon/statistic.svg',
  //     desUrl: 'statistic'
  //   },
  //   {
  //     name: 'Phương thức thanh toán',
  //     ionUrl: 'assets/icon/wallet.svg',
  //     desUrl: 'paymentmethods'
  //   },
  //   {
  //     name: 'Cài đặt',
  //     ionUrl: 'assets/icon/setting.svg',
  //     desUrl: 'account-setting/setting'
  //   },
  //   {
  //     name: 'Giới thiệu',
  //     ionUrl: 'assets/icon/user.svg',
  //     desUrl: 'account-setting/introduce'
  //   },
  //   {
  //     name: 'Thông tin cá nhân',
  //     ionUrl: 'assets/icon/user.svg',
  //     desUrl: 'account'
  //   },
  // ]

  constructor(
    public modalController: ModalController,
    private popoverController: PopoverController,
    private router: Router,
    private accountService: AccountService,
    private imageService: ImageService,
    private geolocationService: GeolocationService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    // this.imageService.getImage();
    this.avatar = localStorage.getItem('avatar')
  }
  routerLink(path) {
    this.router.navigateByUrl(path);
  }
  async openModalLogOut() {
    const modal = await this.modalController.create({
      component: PopuplogoutComponent,
      swipeToClose: true,
      cssClass: 'modal__logout',
    });
    await modal.present();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopupComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      mode: 'md',
    });
    return await popover.present();
  }

  openModalGoogleMap() {
    this.geolocationService.openModalGoogleMap();
  }
}
