import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { WAITING } from '../http/@http-config/messages'
@Injectable()
export class LoadingService {

  constructor(
    public loadingController: LoadingController
  ) { }

  async present(message?) {
      const loading = await this.loadingController.create({
        message: message || '',
        duration: 3000
      });
      await loading.present();
  }
  async dismiss() {
    await this.loadingController.dismiss();
  }
}
