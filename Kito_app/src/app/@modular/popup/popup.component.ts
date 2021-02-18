import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/@app-core/http';
import { CameraService, LoadingService } from 'src/app/@app-core/utils';
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
    public popoverController: PopoverController,) { }
  ngOnInit() {}
  image_avatar: any;
  uploadAvatar() {
    return this.cameraService.getAvatarUpload(this.image_avatar);
  }
  takeAvatar() {
    return this.cameraService.getAvatarTake(this.image_avatar);
  }
  async presentImage(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverimageComponent,
      cssClass: 'image_popover_css',
      event: ev,
      translucent: true,
      mode: 'md'
    });
    return await popover.present();
  }

}
