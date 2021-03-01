import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, ModalController } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";
import { ToastService } from "src/app/@app-core/utils";
import { CompleteQuestionPage } from "../complete-question/complete-question.page";

@Component({
  selector: "app-question",
  templateUrl: "./question.page.html",
  styleUrls: ["./question.page.scss"],
})
export class QuestionPage implements OnInit {
  musicType = true;

  questionTypeName = "";
  heart = 3;
  score = 0;

  questionCounter = 0;
  answerValue = "";
  answerKey = "";

  time: BehaviorSubject<string> = new BehaviorSubject("00:00");
  timer: number;
  forTimer: any;

  questions = { questions: [] };

  soundtrack1 = new Audio();
  right = new Audio();
  wrong = new Audio();

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private modalController: ModalController,
    private toastService: ToastService
  ) {
    for (let i = 1; i <= 12; i++) {
      this.questions.questions.push({
        id: 1729,
        question_topic_id: 33,
        answer: {
          a: " Thợ mộc" + i,
          b: "Thợ mỏ" + i,
          c: " Thợ làm than" + i,
          d: i + 1,
        },
        question: " 1 + " + i + " = ?",
        img_url: null,
        level: 1,
        right: "d",
      });
    }
  }

  ngOnInit() {
    this.loadAudio();
    this.soundtrack1.play();
    localStorage.setItem("score", "0");
    this.startTimer(120);
    this.checkQuestionType();
  }

  ionViewDidLeave() {
    this.stopTimer();
  }

  async questionSetting() {
    let alertQuestionSetting = await this.alertCtrl.create({
      message: "Lựa chọn",
      mode: "ios",
      buttons: [
        {
          text: "Tiếp tục",
        },
        {
          text: "Quay lại",
          handler: () => {
            this.router.navigate(["questionares/choose-question"]);
          },
        },
        {
          text: "Thoát",
          role: "destructive",
          handler: () => {
            this.questionQuit();
          },
        },
      ],
    });
    await alertQuestionSetting.present();
  }

  async questionQuit() {
    let alertQuestionSetting = await this.alertCtrl.create({
      message: "Bạn có muốn thoát?",
      mode: "ios",
      buttons: [
        {
          text: "Hủy",
        },
        {
          text: "Thoát",
          role: "destructive",
          handler: () => {
            localStorage.removeItem("questionType");
            localStorage.removeItem("questionTypeName");
            this.router.navigate(["main/catechism-class"]);
          },
        },
      ],
    });
    await alertQuestionSetting.present();
  }

  checkQuestionType() {
    this.questionTypeName = localStorage.getItem("questionTypeName");
    if (localStorage.getItem("questionType") == "Chủ đề") {
    } else if (localStorage.getItem("questionType") == "Cấp độ") {
    }
  }

  setMusicType() {
    if (this.musicType == true) {
      this.soundtrack1.pause();
      this.musicType = false;
    } else {
      this.soundtrack1.play();
      this.musicType = true;
    }
  }

  loadAudio() {
    this.soundtrack1.src = "../../assets/img/questionares/audios/soundtrack1.mp3"; this.soundtrack1.load();
    this.right.src = "../../assets/img/questionares/audios/right.mp3"; this.right.load();
    this.wrong.src = "../../assets/img/questionares/audios/wrong.mp3"; this.wrong.load();
  }

  startTimer(duration) {
    this.timer = duration;
    this.forTimer = setInterval(() => {
      this.updateTimeValue();
    }, 1000);
  }

  updateTimeValue() {
    let minutes: any = this.timer / 60;
    let seconds: any = this.timer % 60;

    minutes = String("0" + Math.floor(minutes)).slice(-2);
    seconds = String("0" + Math.floor(seconds)).slice(-2);

    const text = minutes + ":" + seconds;
    this.time.next(text);

    --this.timer;

    if (this.timer == 0) {
      this.stopTimer();
      this.openCompleteQuestion();
      this.toastService.present("Hết giờ rồi!", "bottom", 1000, "danger");
    }
  }

  stopTimer() {
    clearInterval(this.forTimer);
    this.soundtrack1.pause();
  }

  btnActivate(e) {
    let answer = document.querySelectorAll(".answer");
    answer.forEach((element) => {
      element.classList.remove("active-button");
    });
    e.target.classList.add("active-button");
  }

  checkAnswerValue(item) {
    this.answerValue = item;
  }

  checkAnswerKey(object, value) {
    this.answerKey = Object.keys(object).find((key) => object[key] === value);
  }

  btnConfirm() {
    this.answerValue = "";
    this.questionCounter++;
    if (this.answerKey == this.questions.questions[this.questionCounter].right) {
      this.score++;
      localStorage.setItem("score", JSON.stringify(this.score));
      this.toastService.present("Đúng rồi!", "bottom", 1000, "warning");
      this.right.play();
    } else {
      this.heart--;
      this.toastService.present("Sai rồi!", "bottom", 1000, "danger");
      this.wrong.play();
    }
    if (this.questionCounter >= 10 || this.heart == 0 || this.score == 10) {
      this.openCompleteQuestion();
      this.stopTimer();
      this.soundtrack1.pause();
    }
  }

  async openCompleteQuestion() {
    const modal = await this.modalController.create({
      component: CompleteQuestionPage,
      cssClass: "my-custom-class",
      swipeToClose: false,
    });
    await modal.present();
  }
}

// playAudio(audio, src) {
//   audio = new Audio();
//   audio.src = src;
//   audio.load();
//   audio.play();
// }

// pauseAudio(audio) {
//   audio.pause()
// }

// loadAudio(audios) {
//   for(let audio of audios) {
//     audio.name = new Audio();
//     audio.name.src = audio.src;
//     audio.name.load();
//     console.log(audio.name)
//     console.log(audio.name,'   ',audio.name.src)
//   }
// }

// playAudio(audioName, audios) {
//   for(let audio of audios) {
//     if (audio.name == audioName.name) {
//       audioName.play();
//     }
//   }
// }
