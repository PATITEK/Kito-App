import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APICONFIG } from '..';
import { map, catchError } from 'rxjs/operators';
import { ModalFoodComponent } from 'src/app/@modular/modal-food/modal-food.component';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { IPageRequest } from '../global';
import { requestQuery } from '../../utils';

@Injectable()
export class OrderService {

  constructor(
    private http: HttpClient,
    private modalCtrl: ModalController, 
    private toastController: ToastController
  ) { }
  public creat(req) {
    return this.http.post(`${APICONFIG.ORDER.CREATE}`, req).pipe(
      map((result) => {
        this.openModalSuccess();
        return result;
      }),
      catchError((errorRes: any) => {
        this.presentToast(errorRes.error.messages[0]);
        throw errorRes.error;
      })
    )
  }

  // public getAll(request: IPageRequest) {
  //   return this.http.get(`${APICONFIG.ORDER.GET_ALL}?${(requestQuery(request))}`).pipe(
  //     map((result: any) => {
  //       return result;
  //     }),
  //     catchError((errorRes) => {
  //       throw errorRes.error;
  //     }));
  // }

  public getAll(request: IPageRequest) {
    return this.http.get(`${APICONFIG.ORDER.GET_ALL}`).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes) => {
        throw errorRes.error;
      }));
  }

  public get(id: number) {
    return this.http.get(`${APICONFIG.ORDER.GET(id)}`).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes) => {
        throw errorRes.error;
      }));
  }

  public delete(id: number) {
    return this.http.delete(`${APICONFIG.ORDER.DELETE(id)}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      }));
  }

  async openModalSuccess() {
    const popover = await this.modalCtrl.create({
      component: ModalFoodComponent,
      cssClass: 'modalFood',
      backdropDismiss: false
    });
    return await popover.present();
  }
  async presentToast(mes) {
    const toast = await this.toastController.create({
      message: mes,
      duration: 2000,
      color: 'warning'
    });
    toast.present();
  }
}
