import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DateTimeService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  title = 'Giỏ hàng';
  cart = [];
  shipCost = 5000;
  paymentMethods = [
    {
      srcIcon: 'assets/icon/dollar.svg',
      name: 'Tiền mặt',
      id: 1
    },
    {
      srcIcon: 'assets/icon/visa.svg',
      name: 'VISA/MASTER',
      id: 2
    }
  ];
  currentPaymentMethodId = 1;
  hasPaymentModal = false;
  paymentSelectElement: any;

  constructor(
    public dateTimeService: DateTimeService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.getCart();
  }

  ionViewDidEnter() {
    this.paymentSelectElement = document.querySelector('.payment-method-container');
  }

  getCart() {
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
  }

  setCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  changeAddress() {

  }

  decreaseAmount(item) {
    if (item.amount > 1) {
      item.amount--;
      this.setCart();
    }
  }

  increaseAmount(item) {
    if (item.amount < 999) {
      item.amount++;
      this.setCart();
    }
  }

  calPrice(item) {
    return item.amount * item.price;
  }

  calTotalPrice() {
    return this.cart.reduce((acc, item) => acc + this.calPrice(item), 0);
  }

  removeItem(item) {
    this.cart.splice(this.cart.indexOf(item), 1);
    this.setCart();
  }

  goBackToStore() {
    this.navCtrl.back();
  }

  toggleHasPaymentModal(value) {
    this.hasPaymentModal = value;
  }

  onCheckClickOutsidePaymentSelect(e) {
    if (this.paymentSelectElement && !this.paymentSelectElement.contains(e.target)) {
      this.toggleHasPaymentModal(false);
    }
  }

  onClickPaymentModal() {
    event.stopPropagation();
  }

  changePayment(paymentMethod) {
    this.currentPaymentMethodId = paymentMethod.id;
    this.toggleHasPaymentModal(false);
  }
}
