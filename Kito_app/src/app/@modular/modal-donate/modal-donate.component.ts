import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-donate',
  templateUrl: './modal-donate.component.html',
  styleUrls: ['./modal-donate.component.scss'],
})
export class ModalDonateComponent implements OnInit {

  constructor(private router: Router, 
    private modalCtrl: ModalController) { }

  ngOnInit() {}
  async closeModal() {
    await this.modalCtrl.dismiss();
  }
}
