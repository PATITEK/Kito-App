import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-complete-question',
  templateUrl: './complete-question.page.html',
  styleUrls: ['./complete-question.page.scss'],
})
export class CompleteQuestionPage implements OnInit {
  score = 0;
  imgUrl = '';
  title = '';
  buttons = [
    {
      name: 'Chơi tiếp',
      routerLink: 'questionares',
    },
    {
      name: 'Thoát',
      routerLink: 'main'
    }
  ]

  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() {
    this.initImgTitle();
  }

  initImgTitle() {
    this.score = parseInt(localStorage.getItem('score'));
    if ( this.score == 10) {
      this.imgUrl = '../../assets/img/questionares/success.svg';
      this.title = 'HOÀN THÀNH XUẤT SẮC !';
    } else {
      this.imgUrl = '../../assets/img/questionares/try-more.svg'
      this.title = 'HÃY CỐ GẮNG HƠN !';
    }
    localStorage.removeItem('score')
  }

  async closeCompleteQuestion() {
    await this.modalCtrl.dismiss();
  }

}
