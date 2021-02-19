import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalDonateComponent } from '../@modular/modal-donate/modal-donate.component';

@Component({
  selector: 'app-dioceses',
  templateUrl: './dioceses.page.html',
  styleUrls: ['./dioceses.page.scss'],
})
export class DiocesesPage implements OnInit {

  title = 'Chọn Giáo Phận';
  list = [
    {
      thumbImage: 'assets/img/tonggiaophan/vatican.svg',
      title: 'Giáo phận Bà Rịa',
      desUrl: 'main/tonggiaophan/parish-news'
    },
    {
      thumbImage: 'assets/img/tonggiaophan/hanoi.svg',
      title: 'Giáo phận Cần Thơ',
      desUrl: 'main/tonggiaophan/parish-news'
    },
    {
      thumbImage: 'assets/img/tonggiaophan/hue.svg',
      title: 'Giáo phận Đà Lạt',
      desUrl: 'main/tonggiaophan/parish-news'
    },
    {
      thumbImage: 'assets/img/tonggiaophan/saigon.svg',
      title: 'Giáo Phận Sài Gòn',
      desUrl: 'main/tonggiaophan/parish-news'
    }
  ]

  constructor(
    private modalCtrl: ModalController,
    ) { }

  ngOnInit() { }
  async goToDetail() {
    const popover = await this.modalCtrl.create({
      component: ModalDonateComponent,
      cssClass: 'modalDonate  ',
    });
    return await popover.present();
  }

}
