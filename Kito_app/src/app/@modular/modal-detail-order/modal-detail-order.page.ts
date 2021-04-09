import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from 'src/app/@app-core/http';
import { DateTimeService, LoadingService, ToastService } from 'src/app/@app-core/utils';
import { ModalService } from 'src/app/@app-core/utils/modal.service';
@Component({
  selector: 'app-modal-detail-order',
  templateUrl: './modal-detail-order.page.html',
  styleUrls: ['./modal-detail-order.page.scss'],
})
export class ModalDetailOrderPage implements OnInit {
  @Input() id;

  setOrderItemId() {
    localStorage.setItem('orderItemId', this.id);
  }
  order: any ;
  order_detail: any;
  constructor(
    private orderService: OrderService,
    private dateTimeService: DateTimeService,
    private loadingService: LoadingService,
    private toarstService: ToastService,
    private modal: ModalService
  ) { }


  ngOnInit() {
    this.getData(this.id);
  }
  getDayString() {
    if (this.order.created_at == '') {
      return ' ';
    }
    return this.dateTimeService.DAYS[new Date(this.order.created_at).getDay()].toUpperCase();
  }

  getData(id) {
    this.orderService.getDetail(id).subscribe((data:any) => {
      this.loadingService.dismiss();
      this.order = data.order;
    })
  }
  cancelOrder(id) {
    this.loadingService.present();
    this.order.status = 'failed';
    this.orderService.delete(id).subscribe(data => {
      this.loadingService.dismiss();
      this.toarstService.presentSuccess();
      this.modal.dismiss(null, undefined, null);
    })
  }

  calTotalPrice() {
    return this.order?.order_details?.reduce((acc, cur) => acc + cur.amount * cur.total_price, 0)
  }
  calTotalAmount() {
    return this.order?.order_details?.reduce((acc, cur) => acc + cur.amount, 0);
  }

}
