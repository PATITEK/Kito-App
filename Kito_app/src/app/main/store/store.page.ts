import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DateTimeService } from 'src/app/@app-core/utils';
import { ModalAddStoreComponent } from 'src/app/@modular/modal-add-store/modal-add-store.component';

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
  recommendedItems = [
    { id: 0, name: 'Mặt dây' },
    { id: 1, name: 'Vòng tay' },
    { id: 2, name: 'Tượng' },
    { id: 3, name: 'Dây chuyền' },
    { id: 4, name: 'Mặt dây' },
    { id: 5, name: 'Mặt dây' },
    { id: 6, name: 'Mặt dây' },
  ];
  currentRecommendedItemId = this.recommendedItems[0].id || '';

  constructor(
    // public dateTimeService: DateTimeService,
    private router: Router,
    private modalController: ModalController
  ) {
    for (let i = 0; i < 10; i++) {
      this.list.push({
        id: i,
        thumbImage: 'assets/img/item-store.svg',
        name: 'Mặt thánh giá inox',
        price: 50000,
        unitPrice: 'đ',
        amount: 0
      });
    }
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getCart();
  }

  ionViewWillLeave() {
    this.resetAmount();
  }

  ionViewDidEnter() {
    this.headerIconElement = document.getElementById('header-icon');
  }

  resetAmount() {
    this.list.forEach(item => item.amount = 0);
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

  calTotalItem() {
    const total = this.cart.reduce((acc, item) => acc + item.amount, 0);
    return total <= 999 ? total : 999;
  }

  goToCart() {
    this.router.navigateByUrl('main/store/cart');
  }

  changeRecommendedItem(recommendedItem) {
    this.currentRecommendedItemId = recommendedItem.id;
  }

  async openAddModal(item) {
    const modal = await this.modalController.create({
      component: ModalAddStoreComponent,
      cssClass: 'add-store-modal',
      swipeToClose: true,
      componentProps: {
        item: item
      }
    });

    modal.present();
    modal.onWillDismiss().then(data => {
      if (data.role == 'ok') {
        item.amount = data.data;
        this.getCart();
      }
    })
  }

  decreaseAmount(item) {
    if (item.amount > 0) {
      item.amount--;
    }
    for (let i of this.cart) {
      if (i.id == item.id) {
        i.amount = item.amount;
        i.amount <= 0 && this.cart.splice(this.cart.indexOf(i), 1);
        break;
      }
    }
    this.setCart();
  }

  increaseAmount(item) {
    if (item.amount < 999) {
      item.amount++;
    }
    for (let i of this.cart) {
      if (i.id == item.id) {
        i.amount = item.amount;
        break;
      }
    }
    this.setCart();
  }
}
