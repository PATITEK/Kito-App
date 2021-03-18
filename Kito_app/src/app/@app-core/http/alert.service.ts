import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  isLoading = false;

  constructor(
    private http: HttpClient,
    public loadingController: LoadingController,
    public alertCtrl: AlertController
  ) { }

  async present(text?) {
    this.isLoading = true;
    return await this.loadingController.create({
      message: text
    })
      .then(a => a.present()
        .then(() => {
          if (!this.isLoading) {
            a.dismiss();
          }
        }));
  }
  async presentAlert(text: string) {
    const alert = await this.alertCtrl.create({
      header: 'Warning',
      message: text,
      buttons: [{
        text: 'Agree',
        role: 'ok'
      }]
    });
    await alert.present();
  }
  async dismiss() {
    this.isLoading = false;
    let topLoader = await this.loadingController.getTop();
    while (topLoader) {
      if (!(await topLoader.dismiss())) {
        break;
      }
      topLoader = await this.loadingController.getTop();
    }
  }
 
}
