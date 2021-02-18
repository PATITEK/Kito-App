import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { PopupComponent } from '../@modular/popup/popup.component';
import { PopuplogoutComponent } from '../@modular/popuplogout/popuplogout.component';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.page.html',
  styleUrls: ['./account-setting.page.scss'],
})
export class AccountSettingPage implements OnInit {
  title = 'Thiết lập tài khoản';
  isOpeningModal = false;
  name = localStorage.getItem('fullname') || '';
  avatar = 'assets/img/avatar-account.svg';

  constructor(
    public modalController: ModalController,
    private popoverController: PopoverController,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    if(localStorage.getItem('avatar')) {
      this.avatar = localStorage.getItem('avatar');
    }
  }

  routerLink(path) {
    // console.log(path);
    this.router.navigateByUrl(path);
  }

  async openModalLogOut() {
    this.isOpeningModal = true;
    const modal = await this.modalController.create({
      component: PopuplogoutComponent,
      swipeToClose: true,
      cssClass: 'modal__logout',
    });
    await modal.present();

    modal.onWillDismiss().then(() => this.isOpeningModal = false);
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
}
