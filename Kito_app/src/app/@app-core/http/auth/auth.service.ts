import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APICONFIG } from '../@http-config/api';
import { catchError, map } from 'rxjs/operators';
// import { ToastrService } from 'ngx-toastr';
// import { SUCCESS } from '../@http-config/messages';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/@app-core/storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { LoadingService, ToastService } from '../../utils';

@Injectable()
export class AuthService {
  private data: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: StorageService,
    public toastController: ToastController,
    private loadingService: LoadingService,
    private toastService: ToastService
  ) { }
  public get receiveData(): Observable<any> {
    return this.data.asObservable();
  }
  public sendData(value: any) {
    this.data.next(value);
  }
  public forgotPassword(req) {
    return this.http.post(`${APICONFIG.AUTH.RESET_PASSWORD_EMAIL}`, req).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes: any) => {
        if(errorRes.error.messages) {
          this.toastService.present(errorRes.error.messages)
        }
        else if(errorRes.error.errors) {
          this.toastService.present(errorRes.error.errors)
        }
        this.loadingService.dismiss();
        throw errorRes.error;
      }));

  }
  public checkcodePassword(req) {
    return this.http.post(`${APICONFIG.AUTH.CHECK_CODE_RESET}`, req).pipe(
      map((result: any) => {
        this.storage.clear();
        localStorage.setItem('Authorization', result.token);
         this.storage.setInfoAccount();
        return result;
        
      }),
      catchError((errorRes: any) => {
        if(errorRes.error.errors ){
          this.toastService.present(errorRes.error.errors, 'top');
        }
        else if(errorRes.error.messages) {
          this.toastService.present(errorRes.error.messages, 'top');
        }
        this.loadingService.dismiss();
        throw errorRes.error;
      }
      ));
  }
  public newPassword(req) {
    return this.http.post(`${APICONFIG.AUTH.RESET_PASSWORD_NEW}`, req).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        this.toastService.present(errorRes.error.errors, 'top')
        throw errorRes.error;
      }
      ));
  }
  public resetPassword(req) {
    return this.http.post(`${APICONFIG.AUTH.RESET_PASSWORD}`, req).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      }
      ));
  }
  public login(req) {
    return this.http.post(`${APICONFIG.AUTH.LOGIN}`, req).pipe(
      map((result: any) => {
        this.storage.clear();
        localStorage.setItem('Authorization', result.token);
         this.storage.setInfoAccount();
        return result;
      }),
      catchError((errorRes: any) => {
        localStorage.clear();
        this.storage.clear();
        if(errorRes.error.errors) {
          this.presentToast(errorRes.error.errors);
        }
        else if(errorRes.error.message) {
          this.presentToast(errorRes.error.errors);
        }
        else {
          this.presentToast('Xảy ra lỗi, vui lòng kiểm tra lại!');
        }
        throw errorRes.error;
      })
      );
  }
  logout() {
    localStorage.clear();
    this.storage.clear();
    window.location.assign('/');
  }
  public signup(req) {
    return this.http.post(`${APICONFIG.AUTH.SIGNUP}`, req).pipe(
      map((result: any) => {
        this.storage.clear();
        localStorage.setItem('Authorization', result.token);
        this.storage.setInfoAccount();
        this.router.navigate(['main/chabad']);
        return result;
      }),
      catchError((errorRes: any) => {
        this.toastService.present('Vui lòng kiểm tra lại thông tin');
        throw errorRes.error;
      }));
  }
  public countryCode() {
    return this.http.get(`${APICONFIG.AUTH.COUNTRY_CODE}`).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      }))
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }
}
