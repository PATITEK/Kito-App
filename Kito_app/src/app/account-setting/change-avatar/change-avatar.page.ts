import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AccountService } from 'src/app/@app-core/http';
import { CameraService, LoadingService, ToastService } from 'src/app/@app-core/utils';
import { ALERT_PHOTO, ALERT_MESSAGE } from '../../@app-core/http/@http-config/messages'
@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.page.html',
  styleUrls: ['./change-avatar.page.scss'],
})
export class ChangeAvatarPage implements OnInit {
  headerCustom = { title: 'Đổi ảnh đại diện' };
  activedAvatar;
  listAvatar = [];
  constructor(
    private accoutnService: AccountService,
    private alertCtrl: AlertController,
    private cameraService: CameraService,
    private toastService: ToastService,
    public loadingService: LoadingService,
    private router: Router
  ) { }
  ngOnInit() {
    this.getData();
  }
  activeAvatar(item) {
    this.activedAvatar = item;

  }
  checkActivedItem(item) {
    return this.activedAvatar && item === this.activedAvatar;
  }
  getData() {
    this.accoutnService.getArrayAvatar().subscribe((data) => {
      this.listAvatar = data.data;
    });
  }
  async avatarSetting() {
    let alertAvatarSetting = await this.alertCtrl.create({
      message: ALERT_PHOTO.SETTING,
      mode: 'ios',
      buttons: [
        {
          text: ALERT_PHOTO.CHOOSE_LIB,
          handler: () => {

            this.cameraService.getAvatarUpload(this.activedAvatar);
            this.router.navigateByUrl('account');
          }
        },
        {
          text: ALERT_PHOTO.TAKE,
          handler: () => {
            this.cameraService.getAvatarTake(this.activedAvatar);
            this.router.navigateByUrl('account');
          }
        },
        {
          text: ALERT_MESSAGE.CLOSE,
          role: 'destructive',
        },
      ]
    });
    await alertAvatarSetting.present();
  }
  updateAvatar() {
    this.loadingService.present()
    localStorage.setItem('avatar', this.activedAvatar)
    this.accoutnService.updateAvatar({ "thumb_image": { "url": this.activedAvatar } }).subscribe(data => {
    })
    this.accoutnService.getAccounts().subscribe();
    this.toastService.presentSuccess();
    this.accoutnService.updateAvatar(this.activedAvatar);
    this.router.navigateByUrl('account');

  }
}
