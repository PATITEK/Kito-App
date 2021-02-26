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
  answerValue = '';
  answerKey = '';

  time: BehaviorSubject<string> = new BehaviorSubject('00:00');
  timer: number;
  forTimer: any;

  questions = {
    questions: []
  }

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    localStorage.setItem('score', '0')
    this.startTimer(120);
    this.checkQuestionType();
    for(let i = 1; i<=12; i++) {
      this.questions.questions.push({
        id: 1729,
        question_topic_id: 33,
        answer: {
          a: " Thợ mộc",
          b: "Thợ mỏ",
          c: " Thợ làm than",
          d: i + 1,
        },
        question: "cau " + i + ": 1 + " + i + " = ?",
        img_url: null,
        level: 1,
        right: 'd',
      })
    }
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
          text: 'Quay lại',
          handler: () => {
            this.router.navigate(['questionares/choose-question']);
          }
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
            this.router.navigate(['questionares']);
          }
        },
      ]
    });
    await alertQuestionSetting.present();
  }

  checkQuestionType() {
    this.questionTypeName = localStorage.getItem('questionTypeName');
    if (localStorage.getItem('questionType') == 'Chủ đề') {
    }
    else if (localStorage.getItem('questionType') == 'Cấp độ') {
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
    this.forTimer = setInterval(() => {
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
      this.openCompleteQuestion();
    }
  }

  btnActivate(e) {
    let answer = document.querySelectorAll('.answer');
    answer.forEach(element => {
      element.classList.remove(('active-button'));
    });
    e.target.classList.add('active-button');
  }

  checkAnswerValue(item) {
    this.answerValue = item;
  }

  checkAnswerKey(object, value) {
    this.answerKey = Object.keys(object).find(key => object[key] === value);
  }

  btnConfirm() {
    this.answerValue = '';
    this.questionCounter++;
    if (this.answerKey == this.questions.questions[this.questionCounter].right) {
      this.score++;
      localStorage.setItem('score', JSON.stringify(this.score));
    } else {
      this.heart--;
    }
    if (this.questionCounter >= 10 || this.heart == 0 || this.score == 10) {
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