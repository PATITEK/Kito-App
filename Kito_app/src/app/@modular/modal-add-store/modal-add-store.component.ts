import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DateTimeService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-modal-add-store',
  templateUrl: './modal-add-store.component.html',
  styleUrls: ['./modal-add-store.component.scss'],
})
export class ModalAddStoreComponent implements OnInit {
  @Input() item: any;
  amount = 1;
  cart = [];
  constructor(
    public dateTimeService: DateTimeService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    console.log(this.item)
    this.getCart();
  }
  decreaseAmount() {
    if (this.amount > 1) {
      this.amount--;
    }
  }

  increaseAmount() {
    if (this.amount < 999) {
      this.amount++;
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

  getCart() {
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
  }

  setCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  addToCart() {
    let duplicated = false;
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].id == this.item.id) {
        this.cart[i].amount += this.amount;
        this.amount = this.cart[i].amount;
        duplicated = true;
        break;
      }
    }
    if (!duplicated) {
      this.item.amount = this.amount;
      this.cart.push(this.item);
    }

    this.setCart();
    this.modalController.dismiss(this.amount, 'ok');
  }
}
