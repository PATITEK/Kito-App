import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/@app-core/http';
import { DateTimeService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  title = 'Kiểm tra đơn hàng';
  cart = [];
  location = '';
  shipCost = 5000;
  paymentMethod;

  constructor(
    public dateTimeService: DateTimeService,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.getCart();
    this.route.queryParams.subscribe(params => {
      this.paymentMethod = JSON.parse(params['data']).paymentMethod;
    })
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
    this.orderService.openModalSuccess().then(() => localStorage.removeItem('cart'));
  }
}
