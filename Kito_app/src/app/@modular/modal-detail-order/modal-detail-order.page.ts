import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrderService } from 'src/app/@app-core/http';
import { DateTimeService, LoadingService, ToastService } from 'src/app/@app-core/utils';
import { AlertController } from '@ionic/angular';
import { ALERT_MESSAGE } from '../../@app-core/http/@http-config/messages'
@Component({
  selector: 'app-modal-detail-order',
  templateUrl: './modal-detail-order.page.html',
  styleUrls: ['./modal-detail-order.page.scss'],
})
export class ModalDetailOrderPage implements OnInit {
  @Input() data;

  setOrderItemId() {
    localStorage.setItem('orderItemId', this.data.order.id);
  }
  order: any;
  fakeImg = 'https://res.cloudinary.com/baodang359/image/upload/v1616123967/kito-music/MDC319_avatar_bqms50.jpg';
  constructor(
    private orderService: OrderService,
    private dateTimeService: DateTimeService,
    public modalController: ModalController,
    private loadingService: LoadingService,
    private alertController: AlertController,
    private toarstService: ToastService
  ) { }


  ngOnInit() {
    this.getData(this.data.order.id);
  }

  getDayString() {
    if (this.order.created_at == '') {
      return ' ';
    }
    return this.dateTimeService.DAYS[new Date(this.order.created_at).getDay()].toUpperCase();
  }

  getData(id) {
    this.orderService.getDetail(id).subscribe(data => {
      this.order = data.order;
    })
  }
  cancelOrder(id) {
    this.loadingService.present();
    this.order.status = 'failed';
    this.orderService.delete(id).subscribe(data => {
      this.toarstService.presentSuccess();
      this.modalController.dismiss();
    })
  }

  calTotalPrice() {
    return this.order.order_details.reduce((acc, cur) => acc + cur.amount * cur.total_price, 0)
  }
  calTotalAmount() {
    return this.order.order_details.reduce((acc, cur) => acc + cur.amount, 0);
  }

}
