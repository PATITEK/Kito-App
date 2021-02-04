import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-menu',
  templateUrl: './modal-menu.component.html',
  styleUrls: ['./modal-menu.component.scss'],
})
export class ModalMenuComponent implements OnInit {

  constructor( private modalController: ModalController,) { }

  ngOnInit() {}
  async closeModal() {
    await this.modalController.dismiss();
  }
}
