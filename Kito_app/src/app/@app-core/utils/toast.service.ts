import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    public toastController: ToastController
  ) { }

  async present(message, position = 'top', duration = 1000, color) {
    const toast = await this.toastController.create({
      mode: 'ios',
      message: message,
      duration: duration,
      position: position == 'top' ? 'top' : 'bottom',
      cssClass:'toast-css',
     color: color,
    });
    toast.present();
  }
}
