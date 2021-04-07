import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ALERT_MESSAGE } from '../http/@http-config/messages'
@Injectable()
export class AlertService {

  constructor(
    public alertService: AlertController,

  ) { }
    
    async present(message?,header?) {
      let alert = await this.alertService.create({
      cssClass: 'my-custom-class',
      header: header || ALERT_MESSAGE.CONTI,
      message: message || ALERT_MESSAGE.QUESTION_CONTI,
      buttons: ['OK']
      })
      await alert.present();
    }
}
