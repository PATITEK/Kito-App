import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OrderService } from 'src/app/@app-core/http';
import { DateTimeService, LoadingService } from 'src/app/@app-core/utils';
import { ModalFoodComponent } from 'src/app/@modular/modal-food/modal-food.component';
import { IDataNoti, PageNotiService } from 'src/app/@modular/page-noti/page-noti.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  headerCustom = { title: 'Kiểm tra đơn hàng' };
  cart = [];
  location = '';
  shipCost = 5000;
  paymentMethod;
  phone;
  order_id: any;
  constructor(
    public dateTimeService: DateTimeService,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private modalCtrl: ModalController,
    private loadingService: LoadingService,
    private pageNotiService: PageNotiService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.getCart();
    this.phone = localStorage.getItem('phone_temp');
    this.route.queryParams.subscribe(params => {
      this.paymentMethod = JSON.parse(params['data']).paymentMethod;
    }).unsubscribe();
  }

  getCart() {
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    this.location = localStorage.getItem('location');
  }

  calPrice(item) {
    return item.amount * item.price;
  }

  calTotalPrice() {
    return this.cart.reduce((acc, item) => acc + this.calPrice(item), 0);
  }
  async openModalSuccess() {
    const popover = await this.modalCtrl.create({
      component: ModalFoodComponent,
      cssClass: 'modalFood',
      backdropDismiss: false,
      componentProps: { order_id: this.order_id }
    });
    return await popover.present();
  }
  ionViewWillLeave() {
    this.modalCtrl.dismiss();
  }
  confirm() {
    this.loadingService.present();
    const req = {
      order: {
        lat: localStorage.getItem('lat'),
        lng: localStorage.getItem('lng'),
        note: null,
        full_address: this.location,
        parish_id: localStorage.getItem('tempParishId'),
        phone_number_receiver: localStorage.getItem('phone_temp'),
        order_details_attributes: this.cart.map(item => ({ product_id: item.id, amount: item.amount }))
      }
    }
    if (this.paymentMethod.id == 0) {
      this.orderService.create(req).subscribe((data: any) => {
        console.log(data)
        this.order_id = data.order.id;
        this.loadingService.dismiss();
        this.paymentByCash();
      })
    }
    else {
      this.orderService.create(req).subscribe(
        (data: any) => {
          this.order_id = data.order.id;
          this.loadingService.dismiss();
          this.openModalSuccess();
          this.modalCtrl.dismiss();
        },
        () => {
          this.loadingService.dismiss();
        }
      )
    }
    localStorage.removeItem('lat');
    localStorage.removeItem('lng');
    localStorage.removeItem('cart');
  }
  paymentByCash() {
    var orderByCash = {
      order_payment: {
        "order_id": this.order_id
      }
    }
    const datapasing: IDataNoti = {
      title: 'THÀNH CÔNG!',
      des: 'Đơn hàng đặt thành công!',
      routerLink: '/main/chabad'
    }
    this.orderService.paymentOrder_Cash(orderByCash).subscribe(data => {
      this.loadingService.dismiss();
      this.pageNotiService.setdataStatusNoti(datapasing);
      this.router.navigateByUrl('/page-noti');
    },
      () => {
        this.loadingService.dismiss();
      })
  }
}
