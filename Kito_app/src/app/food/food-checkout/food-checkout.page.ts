import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/@app-core/http';
import { OrderService } from 'src/app/@app-core/http/order/order.service';
declare var Stripe;

@Component({
  selector: 'app-food-checkout',
  templateUrl: './food-checkout.page.html',
  styleUrls: ['./food-checkout.page.scss'],
})
export class FoodCheckoutPage implements OnInit {
  stripe = Stripe('pk_test_51IFwpWCpBejooWZYsmTcqPL7wfAcx58B6lQNiE3K8XEueAbjRJCRzczedDQO3LbJ1afIh6oln6VT6SZXOZYtiL6G00Ow7S9qTG');
  card: any;
  dataBasket = [];
  dataBaketToCreat = [];
  currentItem: any = {
    id : 0,
    amount : 0,
  }
  note = '';
  order = {
    long: 0.5,
    lat: 0.5,
    note: this.note,
    full_address: '',
    phone_number_receiver: '',
    order_details_attributes: this.dataBaketToCreat
  }
  constructor( 
    private route: ActivatedRoute,
    private orderService: OrderService,
    private accountService: AccountService) { 
      this.getUserData();
      this.route.queryParams.subscribe(params => {
        if( JSON.parse(params['data']).note == '') {
          this.note = 'No note for this order!'
        }
        else {
          this.note = JSON.parse(params['data']).note;
        }
        this.order.note = this.note;
      })
      this.getDataBasket();
    }

  ngOnInit() {
      this.setupStripe()
   
  }
  confirm() {
    localStorage.removeItem('dataBasket');
    this.orderService.creat(this.order).subscribe(data => {
      // console.log(data);
    })
  }
  plusItem(item) {
    if(item.amount < 99) {
      item.amount++;
    }
    this.setDataBasket();
  }
  minusItem(item) {
    if(item.amount > 1) {
      item.amount--;
    }
    this.setDataBasket();
  }
  removeItem(food) {
    for(let i = 0; i< this.dataBasket.length; i++) {
      if(food.id === this.dataBasket[i].id) {
        this.dataBasket.splice(i,1);
        break;
      }
    }
    this.setDataBasket();
  }

  setDataBasket() {
    localStorage.setItem('dataBasket', JSON.stringify(this.dataBasket));
  }
  getDataBasket() {
    this.dataBasket = JSON.parse(localStorage.getItem('dataBasket')) || [];
    for(let i = 0; i< this.dataBasket.length; i++) {
      this.dataBaketToCreat.push({food_id: this.dataBasket[i].id, amount: this.dataBasket[i].amount});
    }
    this.order.order_details_attributes = this.dataBaketToCreat;
  }

  calTotalPrice() {
    return this.dataBasket.reduce((acc, cur) => acc + cur.amount*cur.price , 0)
  }

  getUserData() {
    this.accountService.getAccounts().subscribe(data => {
      this.order.full_address = data.app_user.full_address + ', district ' + data.app_user.district + ', ' + data.app_user.province + ', ' + data.app_user.country_code;
      this.order.phone_number_receiver = data.app_user.phone_number;
    });
  }
setupStripe() {
  let elements = this.stripe.elements();
  var style = {
    base: {
      color: '#32325d',
      lineHeight: '24px',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  };

  this.card = elements.create('card', { style: style });
  this.card.mount('#card-element');
  this.card.addEventListener('change', event => {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
      displayError.textContent = event.error.message;
    } else {
      displayError.textContent = '';
    }
  });

  var form = document.getElementById('payment-form');
  form.addEventListener('submit', event => {
    event.preventDefault();
    this.stripe.createSource(this.card).then(result => {
      if (result.error) {
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        console.log(result);
      }
    });
  });
}
}
