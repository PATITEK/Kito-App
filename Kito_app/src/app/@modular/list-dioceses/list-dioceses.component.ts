import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalDonateComponent } from '../modal-donate/modal-donate.component';

@Component({
  selector: 'app-list-dioceses',
  templateUrl: './list-dioceses.component.html',
  styleUrls: ['./list-dioceses.component.scss'],
})
export class ListDiocesesComponent implements OnInit {
  @Input() data: any;
  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {}
  async goToDetail() {
    const popover = await this.modalCtrl.create({
      component: ModalDonateComponent,
      cssClass: 'modalDonate  ',
    });
    return await popover.present();
  }
}
