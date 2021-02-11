import { Component, OnInit, ViewChild } from '@angular/core';
import { DateTimeService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  title = 'Cửa hàng';
  list = [];
  cart = [];
  hasSetting = false;
  headerIconElement: any;

  constructor(
    public dateTimeService: DateTimeService
  ) {
    for (let i = 0; i < 10; i++) {
      this.list.push([
        {
          thumbImage: 'assets/img/item-store.svg',
          name: 'Mặt thánh giá inox',
          price: 50000,
          unitPrice: 'đ'
        },
        {
          thumbImage: 'assets/img/item-store.svg',
          name: 'Mặt thánh giá inox',
          price: 500000000,
          unitPrice: 'đ'
        }
      ]);
    }
  }

  ngOnInit() {
    this.getCart();
  }

  ionViewDidEnter() {
    this.headerIconElement = document.getElementById('header-icon');
  }

  toggleHasSetting(value) {
    this.hasSetting = value;
  }

  onCheckClickOutsideHeaderIcon(e) {
    if (this.headerIconElement && !this.headerIconElement.contains(e.target)) {
      this.toggleHasSetting(false);
    }
  }

  getCart() {
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
  }

  setCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  addToCart(item) {
    let itemTemp = item;
    itemTemp.amount = 0;
    this.cart.push(itemTemp);
    this.setCart();
  }
}
