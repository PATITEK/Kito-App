import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/@app-core/http';
import { DateTimeService, LoadingService } from 'src/app/@app-core/utils';

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

  constructor(
    public dateTimeService: DateTimeService,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.getCart();
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

  confirm() {
    this.loadingService.present();
    const req = {
      order: {
        lat: localStorage.getItem('lat'),
        lng: localStorage.getItem('lng'),
        note: null,
        // full_address: this.location,
        full_address: 'test',
        phone_number_receiver: localStorage.getItem('phoneNumber'),
        order_details_attributes: this.cart.map(item => ({ product_id: item.id, amount: item.amount }))
      }
    }
    this.orderService.create(req).subscribe(
      () => {
        this.loadingService.dismiss();
      },
      () => {
        this.loadingService.dismiss();
      }
    )
    localStorage.removeItem('lat');
    localStorage.removeItem('lng');
  }
}
