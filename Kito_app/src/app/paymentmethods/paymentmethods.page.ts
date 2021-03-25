import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { DonateService } from '../@app-core/http';
import { LoadingService, ToastService } from '../@app-core/utils';
import { PaymentupComponent } from '../@modular/paymentup/paymentup.component';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-paymentmethods',
  templateUrl: './paymentmethods.page.html',
  styleUrls: ['./paymentmethods.page.scss'],
})
export class PaymentmethodsPage implements OnInit {
  dataParam: any;
  payment;
  headerCustom = {title: 'Phương thức thanh toán', background:'#fff'}
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public modalController: ModalController,
    private donateService: DonateService,
    private alert: AlertController,
    private loading: LoadingService,
    private iab: InAppBrowser,

  ) { }

  ngOnInit() {
    let url = window.location.href;
      if (url.includes('?')) {
    this.route.queryParams.subscribe(params => {
      this.dataParam =  JSON.parse(params['data']);
    })
  }
}
  async openModal() {
    const modal = await this.modalController.create({
      component: PaymentupComponent,
      swipeToClose: true,
      cssClass: 'modal__payment'
    });
    await modal.present();

  }
  async presentAlertMoMo( header: string, text: string) {
    const alert = await this.alert.create({
      header: header,
      message: text,
      buttons: [
        {
          text: 'Hủy',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Tiếp tục',
          handler: () => {
            const browser = this.iab.create(this.payment.pay_url,'_system', 'location=yes');
            // browser.on('loadstop').subscribe(event => {
            //   browser.insertCSS({ code: "body{color: red;" });
            // });
            // browser.close();
          }
        }
      ]
    });
    await alert.present();
  }
    goMomo() {
      this.loading.present('Vui lòng chờ...');
      this.dataParam.donation.payment_type = 'momo';
      this.dataParam.donation['app_link'] = "no link";
      this.donateService.donateByMoMo(this.dataParam).subscribe((data) => {
        this.loading.dismiss();
        this.payment = data;
        this.presentAlertMoMo('Thông báo','Bắt đầu thanh toán qua momo');
      })

    }
}
