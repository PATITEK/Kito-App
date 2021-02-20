import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/@app-core/http';
import { CameraService, LoadingService, ToastService } from 'src/app/@app-core/utils';
import { catchError, map } from 'rxjs/operators';
import { PopoverController } from '@ionic/angular';
import { PopoverimageComponent } from '../popoverimage/popoverimage.component';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {

  constructor(private cameraService: CameraService,
    private accountService: AccountService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    public popoverController: PopoverController,
    ) { }
  ngOnInit() {}
  image_avatar: any;
  image_null: any;
  image_url: any;
  remove_label = '';
 uploadAvatar() {
    this.cameraService.getAvatarUpload(this.image_avatar)
    this.dismissPopover();
  }
  takeAvatar() {
    this.cameraService.getAvatarTake(this.image_avatar);
    this.dismissPopover();
  }
  dismissPopover() {
    this.popoverController.dismiss();
  }
  removeAvatar() {
    this.loadingService.present();
    console.log('hi');
    this.image_null = {
      "thumb_image": {
          "url": null
      }
  }
  this.accountService.updateAvatar(this.image_null).subscribe(
    (data:any) => {
    this.loadingService.dismiss();
    this.dismissPopover();
    this.toastService.present('Xóa ảnh thành công !', 'top', 2000);
    },
    (data:any) => {
      this.loadingService.dismiss();
      if(data.error) {
        this.dismissPopover();
        this.toastService.present('Lỗi rồi !', 'top', 2000);
      }
    }
 )
}
  async presentImage() {
    const popoverImage = await this.popoverController.create({
      component: PopoverimageComponent,
      cssClass: 'image_popover_css',
      translucent: true,
      mode: 'md'
    });
    return await popoverImage.present();
  }

  async dismissPopup() {
    const popover = await this.popoverController.create({
      component: PopupComponent,
      cssClass: 'my-custom-class',
      translucent: true,
      mode: 'md',
    });
    return await popover.dismiss();
  }

}
