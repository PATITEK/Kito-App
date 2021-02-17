import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
    public dateTimeService: DateTimeService,
    private router: Router
  ) {
    for (let i = 0; i < 10; i++) {
      this.list.push([
        {
          id: i,
          thumbImage: 'assets/img/item-store.svg',
          name: 'Mặt thánh giá inox',
          price: 50000,
          unitPrice: 'đ',
        },
        {
          id: i + 30,
          thumbImage: 'assets/img/item-store.svg',
          name: 'Mặt thánh giá inox',
          price: 500000000,
          unitPrice: 'đ',
        }
      ]);
    }
  }

  ngOnInit() {
  }
  
  ionViewWillEnter() {
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
    let itemTemp = Object.assign({}, item);
    itemTemp.amount = 1;

    let duplicated = false;
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].id == itemTemp.id) {
        this.cart[i].amount++;
        duplicated = true;
        break;
      }
    }
    !duplicated && this.cart.push(itemTemp);

    this.setCart();
  }

  calTotalItem() {
    const total = this.cart.reduce((acc, item) => acc + item.amount, 0);
    return total <= 99 ? total : '+99';
  }

  goToCart() {
    this.router.navigateByUrl('main/store/cart');
  }
}
