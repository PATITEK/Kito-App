import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalDonateComponent } from 'src/app/@modular/modal-donate/modal-donate.component';

@Component({
  selector: 'app-tonggiaophan',
  templateUrl: './tonggiaophan.page.html',
  styleUrls: ['./tonggiaophan.page.scss'],
})
export class TonggiaophanPage implements OnInit {
  title = '(Tổng) Giáo phận';
  list = [
    {
      thumbImage: 'assets/img/tonggiaophan/vatican.svg',
      title: 'Tin tức tòa thánh Vatican',
      desUrl: 'main/tonggiaophan/parish-news'
    },
    {
      thumbImage: 'assets/img/tonggiaophan/hanoi.svg',
      title: 'Tổng giáo phận Hà Nội',
      desUrl: 'main/tonggiaophan/parish-news'
    },
    {
      thumbImage: 'assets/img/tonggiaophan/hue.svg',
      title: 'Tổng giáo phận Huế',
      desUrl: 'main/tonggiaophan/parish-news'
    },
    {
      thumbImage: 'assets/img/tonggiaophan/saigon.svg',
      title: 'Tổng giáo phận Sài Gòn',
      desUrl: 'main/tonggiaophan/parish-news'
    }
  ]

  constructor(
    private modalCtrl: ModalController,
    ) { }

  ngOnInit() { }
  // async openModalMenu() {
  //   const popover = await this.modalCtrl.create({
  //     component: ModalDonateComponent,
  //     cssClass: 'modalDonate  ',
  //   });
  //   return await popover.present();
  // }
}
