import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DateTimeService, GeolocationService } from 'src/app/@app-core/utils';

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
      id: 0
    },
    {
      srcIcon: 'assets/icon/visa.svg',
      name: 'VISA/MASTER',
      id: 1
    }
  ];
  currentPaymentMethodId = 1;
  hasPaymentModal = false;
  paymentSelectElement: any;
  location = 'Hãy lấy địa chỉ hoặc nhập địa chỉ của bạn';

  constructor(
    public dateTimeService: DateTimeService,
    private navCtrl: NavController,
    private router: Router,
    private geolocationSerivce: GeolocationService
  ) { }

  ngOnInit() {
    this.getCart();
    // this.geolocationSerivce.getCurrentLocation();
  }

  reTakeLocation() {
    this.geolocationSerivce.getCurrentLocation();
    this.location = this.geolocationSerivce.customerLocation.address;
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
    // this.navCtrl.back();
    console.log('object');
    this.router.navigateByUrl('main/store');
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

  goToCheckout() {
    const data = {
      paymentMethod: this.paymentMethods[this.currentPaymentMethodId]
    }
    this.router.navigate(['main/store/cart/checkout'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }
}
