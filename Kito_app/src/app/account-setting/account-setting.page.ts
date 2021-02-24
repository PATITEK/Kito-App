import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { AccountService } from '../@app-core/http/account/account.service';
import { ImageService } from '../@app-core/utils';
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
  avatar = '';

  constructor(
    public modalController: ModalController,
    private popoverController: PopoverController,
    private router: Router,
    private accountService: AccountService,
    private imageService: ImageService
  ) { }

  ngOnInit() {
  }
  
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
  routerLink(path) {
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
