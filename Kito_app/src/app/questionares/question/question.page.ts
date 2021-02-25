import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {
  musicType = true;
  questionCounter = 0;
  time: BehaviorSubject<string> = new BehaviorSubject('00:00');
  timer: number;
  forTimer: any;
  choosedId = '';
  answerKey = '';
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
    ]
  }

  

  constructor() { }

  ngOnInit() {
    this.startTimer(120);
  }

  setMusicType() {
    if (this.musicType == true) {
      this.musicType = false;
    }
    else {
      this.musicType = true;
    }
    console.log(this.musicType)
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

  btnConfirm() {
    this.choosedId = '';
    this.questionCounter += 1;
  }
}


