import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-food',
  templateUrl: './modal-food.component.html',
  styleUrls: ['./modal-food.component.scss'],
})
export class ModalFoodComponent implements OnInit {

  constructor(private router: Router, private modalCtrl: ModalController) { }
  @Input() order_id: any;
  data: any;
  ngOnInit() {
    this.data = {
      order_id: this.order_id,
      type_page: 'order',
      token: '',
    }
   }
  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  continute () {
    this.router.navigate(['paymentmethods'], {
      queryParams: {
        data: JSON.stringify(this.data)
      }
    })
  }
}
