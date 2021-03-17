import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PaymentupComponent } from '../@modular/paymentup/paymentup.component';

@Component({
  selector: 'app-paymentmethods',
  templateUrl: './paymentmethods.page.html',
  styleUrls: ['./paymentmethods.page.scss'],
})
export class PaymentmethodsPage implements OnInit {
  data: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    let url = window.location.href;
    if (url.includes('?')) {
    this.route.queryParams.subscribe(params => {
      this.data =  JSON.parse(params['data']);
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

}
