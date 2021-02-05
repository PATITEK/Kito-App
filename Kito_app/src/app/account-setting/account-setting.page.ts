import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { PopupComponent } from '../@modular/popup/popup.component';
import { PopuplogoutComponent } from '../@modular/popuplogout/popuplogout.component';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.page.html',
  styleUrls: ['./account-setting.page.scss'],
})
export class AccountSettingPage implements OnInit {
  isOpeningModal = false;
  name = localStorage.getItem('fullname') || '';
  img_url = 'assets/img/user.png';

  constructor(
    public modalController: ModalController,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    if(localStorage.getItem('img_url')) {
      this.img_url = localStorage.getItem('img_url');
    }
  }

  async openModalLogOut() {
    this.isOpeningModal = true;
    const modal = await this.modalController.create({
      component: PopuplogoutComponent,
      swipeToClose: true,
      cssClass: 'modal__logout'
    });
    await modal.present();

    modal.onWillDismiss().then(() => this.isOpeningModal = false);
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopupComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}
