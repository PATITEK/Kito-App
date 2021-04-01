import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionaresService } from 'src/app/@app-core/http';

@Component({
  selector: 'app-choose-question',
  templateUrl: './choose-question.page.html',
  styleUrls: ['./choose-question.page.scss'],
})
export class ChooseQuestionPage implements OnInit {
  title = '';
  headerCustom = { title: '', background:'transparent', color: '#fff' };
  questions = [];

  questionType = '';

  towel = ['towel1.png', 'towel2.png', 'towel3.png', 'towel4.png', 'towel1.png']

  constructor(
    private router: Router,
    private questionaresService: QuestionaresService
  ) { }

  ngOnInit() {
    this.setUpQuestion();
  }

  ionViewWillEnter() {
    // this.setUpQuestion();
    localStorage.removeItem('questionTypeName');
    if(localStorage.getItem('score')) {
      localStorage.removeItem('score');
    }
  }

  setUpQuestion() {
    if(localStorage.getItem('questionType') == 'topic') {
      this.questionaresService.getTopic().subscribe((data) => {
        this.questions = data.question_topics;
      })
      this.questionType = 'Chủ đề'
      this.title = 'CHỌN CHỦ ĐỀ';
    }
    else if(localStorage.getItem('questionType') == 'level') {
      this.questionaresService.getLevel().subscribe((data) => {
        this.questions = data;
        for(let i=0; i<this.questions.length; i++) {
          this.questions[i].img = '../../../assets/img/questionares/' + this.towel[i];
        }
      })
      this.questionType = 'Cấp độ'
      this.title = 'CHỌN CẤP ĐỘ';
    }
    this.headerCustom.title = this.title;
    localStorage.removeItem('questionTypeName');
    if(localStorage.getItem('score')) {
      localStorage.removeItem('score');
    }
  }

  goToQuestion(name) {
    if(localStorage.getItem('questionType') == 'topic') {
      localStorage.setItem('idTopic', name.id);
    }
    else if(localStorage.getItem('questionType') == 'level') {
      localStorage.setItem('idLevel', name.level);
    }
    localStorage.setItem('questionTypeName', this.questionType + ' ' + name.name);
    this.router.navigate(['questionares/question']);
  }

}
