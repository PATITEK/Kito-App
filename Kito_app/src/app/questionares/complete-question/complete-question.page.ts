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
  win = new Audio();
  lose = new Audio();
  buttons = [
    {
      name: 'Chơi tiếp',
      routerLink: 'questionares',
    },
    {
      name: 'Thoát',
      routerLink: 'main/catechism-class'
    }
  ]

  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() {
    this.loadAudios();
    this.lose.play();
    this.initImgTitle();
  }

  ionViewWillLeave() {
    localStorage.removeItem('score');
    this.pauseAudios();
  }

  initImgTitle() {
    localStorage.removeItem('questionType');
    localStorage.removeItem('questionTypeName');
    this.score = parseInt(localStorage.getItem('score'));
    if ( this.score == 10) {
      this.imgUrl = '../../assets/img/questionares/success.svg';
      this.title = 'HOÀN THÀNH XUẤT SẮC !';
      this.win.play();
      this.lose.pause();
    } else {
      this.imgUrl = '../../assets/img/questionares/try-more.svg'
      this.title = 'HÃY CỐ GẮNG HƠN !';
    }
  }

  loadAudios() {
    this.win.src = "../../assets/img/questionares/audios/win.mp3"; this.win.load();
    this.lose.src = "../../assets/img/questionares/audios/lose.mp3"; this.lose.load();
  }

  pauseAudios() {
    this.win.pause();
    this.lose.pause();
  }

  async closeCompleteQuestion() {
    await this.modalCtrl.dismiss();
  }

}
