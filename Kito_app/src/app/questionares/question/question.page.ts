import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CompleteQuestionPage } from '../complete-question/complete-question.page';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {
  musicType = true;

  questionTypeName = '';
  heart = 3;
  score = 0

  questionCounter = 0;
  choosedId = '';
  answerKey = '';

  time: BehaviorSubject<string> = new BehaviorSubject('00:00');
  timer: number;
  forTimer: any;
  
  questions = {
    questions: [
      {
        id: 1729,
        question_topic_id: 33,
        answer: {
          a: " Thợ mộc",
          b: "Thợ mỏ",
          c: " Thợ làm than",
          d: " Cả B & C"
        },
        question: "cau 1",
        img_url: null,
        level: 1
      },
      {
        id: 1729,
        question_topic_id: 33,
        answer: {
          a: " Thợ mộc 2",
          b: "Thợ mỏ",
          c: " Thợ làm than",
          d: " Cả B & C"
        },
        question: "cau 2",
        img_url: null,
        level: 1
      },
      {
        id: 1729,
        question_topic_id: 33,
        answer: {
          a: " Thợ mộc 3",
          b: "Thợ mỏ",
          c: " Thợ làm than",
          d: " Cả B & C"
        },
        question: "cau 3",
        img_url: null,
        level: 1
      },
      {
        id: 1729,
        question_topic_id: 33,
        answer: {
          a: " Thợ mộc",
          b: "Thợ mỏ",
          c: " Thợ làm than",
          d: " Cả B & C"
        },
        question: "cau 4",
        img_url: null,
        level: 1
      },
      {
        id: 1729,
        question_topic_id: 33,
        answer: {
          a: " Thợ mộc",
          b: "Thợ mỏ",
          c: " Thợ làm than",
          d: " Cả B & C"
        },
        question: "cau 5",
        img_url: null,
        level: 1
      },
      {
        id: 1729,
        question_topic_id: 33,
        answer: {
          a: " Thợ mộc",
          b: "Thợ mỏ",
          c: " Thợ làm than",
          d: " Cả B & C"
        },
        question: "cau 6",
        img_url: null,
        level: 1
      },
      {
        id: 1729,
        question_topic_id: 33,
        answer: {
          a: " Thợ mộc",
          b: "Thợ mỏ",
          c: " Thợ làm than",
          d: " Cả B & C"
        },
        question: "cau 7",
        img_url: null,
        level: 1
      },
      {
        id: 1729,
        question_topic_id: 33,
        answer: {
          a: " Thợ mộc",
          b: "Thợ mỏ",
          c: " Thợ làm than",
          d: " Cả B & C"
        },
        question: "cau 8",
        img_url: null,
        level: 1
      },
      {
        id: 1729,
        question_topic_id: 33,
        answer: {
          a: " Thợ mộc",
          b: "Thợ mỏ",
          c: " Thợ làm than",
          d: " Cả B & C"
        },
        question: "cau 9",
        img_url: null,
        level: 1
      },
      {
        id: 1729,
        question_topic_id: 33,
        answer: {
          a: " Thợ mộc",
          b: "Thợ mỏ",
          c: " Thợ làm than",
          d: " Cả B & C"
        },
        question: "cau 10",
        img_url: null,
        level: 1
      },
    ]
  }

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.startTimer(120);
    this.checkQuestionType();
  }

  async questionSetting() {
    let alertQuestionSetting = await this.alertCtrl.create({
      message: 'Lựa chọn',
      mode: 'ios',
      buttons: [
        {
          text: 'Tiếp tục',
        },
        {
          text: 'Thoát',
          role: 'destructive',
          handler: () => {
            this.questionQuit();
          }
        },
      ]
    });
    await alertQuestionSetting.present();
  }

  async questionQuit() {
    let alertQuestionSetting = await this.alertCtrl.create({
      message: 'Bạn có muốn thoát?',
      mode: 'ios',
      buttons: [
        {
          text: 'Hủy',
        },
        {
          text: 'Thoát',
          role: 'destructive',
          handler: () => {
            localStorage.removeItem('questionType');
            localStorage.removeItem('questionTypeName');
            this.router.navigate(['main']);
          }
        },
      ]
    });
    await alertQuestionSetting.present();
  }

  checkQuestionType() {
    this.questionTypeName = localStorage.getItem('questionTypeName');
    if(localStorage.getItem('questionType') == 'Chủ đề') {
    }
    else if(localStorage.getItem('questionType') == 'Cấp độ') {
    }
  }

  setMusicType() {
    if (this.musicType == true) {
      this.musicType = false;
    }
    else {
      this.musicType = true;
    }
  }

  startTimer(duration: number) {
    this.timer = duration;
    this.forTimer =  setInterval( () => {
      this.updateTimeValue();
    }, 1000);
    
  }
  stopTimer() {
    clearInterval(this.forTimer);
  }

  updateTimeValue() {
    let minutes: any = this.timer / 60;
    let seconds: any = this.timer % 60;

    minutes = String('0' + Math.floor(minutes)).slice(-2);
    seconds = String('0' + Math.floor(seconds)).slice(-2);

    const text = minutes + ':' + seconds;
    this.time.next(text);

    --this.timer;

    if (this.timer == -1) {
      this.stopTimer();
      // this.timeOver();
      // this.openModalLose();
    }
  }

  btnActivate(e) {
    let answer = document.querySelectorAll('.answer');
    answer.forEach(element => {
      element.classList.remove(('active-button'));
    });
    e.target.classList.add('active-button');
  }

  checkIfAnswerChoosed(item) {
    this.choosedId = item;
  }

  getKeyToCheckRight(object, value) {
    this.answerKey = Object.keys(object).find(key => object[key] === value);
  }

  btnAnswer(item, object, value) {
    this.choosedId = item;
  }

  btnConfirm() {
    this.choosedId = '';
    this.questionCounter += 1;

    this.score += 1;
    localStorage.setItem('score', JSON.stringify(this.score));

    if(this.questionCounter == 2 || this.heart == 0 || this.timer == -1) {
      this.stopTimer();
      this.openCompleteQuestion();
    }
  }

  async openCompleteQuestion() {
    const modal = await this.modalController.create({
      component: CompleteQuestionPage,
      cssClass: 'my-custom-class',
      swipeToClose: false,
    });
    await modal.present();
  }
}


