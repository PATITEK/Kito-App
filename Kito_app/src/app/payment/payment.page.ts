import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DonateService } from '../@app-core/http';
import { LoadingService } from '../@app-core/utils';
import { IDataNoti, PageNotiService } from '../@modular/page-noti/page-noti.service';
declare var Stripe;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  data:any;
  stripe = Stripe('pk_test_51IFwpWCpBejooWZYsmTcqPL7wfAcx58B6lQNiE3K8XEueAbjRJCRzczedDQO3LbJ1afIh6oln6VT6SZXOZYtiL6G00Ow7S9qTG');
  card: any;
  amount: any;
  purpose: any;
  constructor(
    private route: ActivatedRoute,
    private pageNotiService: PageNotiService,
    private router: Router,
    private donateService: DonateService,
    public loadingService: LoadingService,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.data =  JSON.parse(params['data']);
    })
    this.amount = this.data.donation.amount;
    this.purpose = this.data.donation.note;
    
  }
  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      color: color,
    });
    toast.present();
  }
  showStripe() {
    this.loadingService.present();
    const datapasing: IDataNoti = {
      title: 'ĐÓNG GÓP THÀNH CÔNG!',
      des: 'Cảm ơn sự đóng góp của bạn!',
      routerLink: '/main/chabad'
    }
    this.pageNotiService.setdataStatusNoti(datapasing);
    this.router.navigateByUrl('/page-noti');
    this.loadingService.dismiss()
    
  }
  
}
