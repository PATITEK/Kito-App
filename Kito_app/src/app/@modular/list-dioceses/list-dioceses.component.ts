import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalDonateComponent } from '../modal-donate/modal-donate.component';

@Component({
  selector: 'app-list-dioceses',
  templateUrl: './list-dioceses.component.html',
  styleUrls: ['./list-dioceses.component.scss'],
})
export class ListDiocesesComponent implements OnInit {
  @Input() data: any;
  @Input() flag_parishes_diocese: string;
  @Input() type;
  constructor(
    private modalCtrl: ModalController,
    public router: Router
  ) { }

  ngOnInit() {
  }
  async goToDetail() {
    if (this.flag_parishes_diocese === 'diocese') {
      const popover = await this.modalCtrl.create({
        component: ModalDonateComponent,
        swipeToClose: true,
        cssClass: 'modalDonate',
        componentProps: { diocese_id: this.data.id, type: this.type }
      });
      return await popover.present();
    }
    else {
      const data = {
        id: this.data.id,
        source_type: 'Parishes'
      }
      this.router.navigate(['donate'], {
        queryParams: {
          data: JSON.stringify(data)
        }
      })
    }
  }
}
