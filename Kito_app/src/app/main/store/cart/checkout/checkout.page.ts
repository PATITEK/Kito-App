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
  address = '';
  shipCost = 5000;
  paymentMethod;
  phone;
  order_id: any;
  constructor(
    public dateTimeService: DateTimeService,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private modal: ModalController,
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
    this.address = localStorage.getItem('address');
  }

  calPrice(item) {
    return item.amount * item.price;
  }

  calTotalPrice() {
    return this.cart.reduce((acc, item) => acc + this.calPrice(item), 0);
  }
  async openModalSuccess() {
    const popover = await this.modal.create({
      component: ModalFoodComponent,
      cssClass: 'modalFood',
      backdropDismiss: false,
      componentProps: { order_id: this.order_id }
    });
    return await popover.present();
  }
  ionViewWillLeave() {
    this.modal.dismiss(null, undefined, null);
  }
  confirm() {
    this.loadingService.present();
    const datapasing: IDataNoti = {
      title: 'THÀNH CÔNG!',
      des: 'Đơn hàng đặt thành công!',
      routerLink: '/main/chabad'
    }
    const req = {
      order: {
        lat: localStorage.getItem('lat'),
        lng: localStorage.getItem('lng'),
        note: null,
        full_address: this.address,
        parish_id: localStorage.getItem('tempParishId'),
        phone_number_receiver: localStorage.getItem('phone_temp'),
        order_details_attributes: this.cart.map(item => ({ product_id: item.id, amount: item.amount }))
      }
    }
    if (this.paymentMethod.id == 0) {
      this.orderService.create(req).subscribe((data: any) => {
        this.loadingService.dismiss();
        this.order_id = data.order.id;
        this.pageNotiService.setdataStatusNoti(datapasing);
        this.router.navigateByUrl('/page-noti');
      })
    }
    else {
      this.orderService.create(req).subscribe(
        (data: any) => {
          this.loadingService.dismiss();
          this.order_id = data.order.id;
          this.openModalSuccess();
          this.modal.dismiss(null, undefined, null);
        }
      )
    }
    localStorage.removeItem('lat');
    localStorage.removeItem('lng');
    localStorage.removeItem('cart');
  }
 
}
