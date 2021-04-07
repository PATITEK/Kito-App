import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { STATUS, TOARST } from '../http/@http-config/messages'
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    public toastController: ToastController
  ) { }

  async presentSuccess(message?, position?, color?,duration?) {
    const toast = await this.toastController.create({
      mode: 'ios',
      message: message || STATUS.SUCCESS,
      duration: duration || 1000,
      position: position || TOARST.POSITION.top,
      cssClass: 'toast-css',
      color: color || TOARST.COLOR.dark,
    });
    toast.present();
  }
  async presentFail(message?, position?, color?,duration?) {
    const toast = await this.toastController.create({
      mode: 'ios',
      message: message || STATUS.FAIL,
      duration: duration || 1000,
      position: position || TOARST.POSITION.top,
      cssClass: 'toast-css',
      color: color || TOARST.COLOR.dark,
    });
    toast.present();
  }
}
