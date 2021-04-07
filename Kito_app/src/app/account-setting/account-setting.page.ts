import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { AccountService } from '../@app-core/http/account/account.service';
import { GeolocationService } from '../@app-core/utils';
import { AlertService } from '../@app-core/utils/alert.service';
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
  constructor(
    public modalController: ModalController,
    private router: Router,
    private geolocationService: GeolocationService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
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

  async openModalGoogleMap() {
    if (localStorage.getItem('diocese_id')) this.geolocationService.openModalGoogleMap();
    else {
      this.alertService.present();
    }
  }
}
