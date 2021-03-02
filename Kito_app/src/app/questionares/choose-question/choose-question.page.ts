import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionaresService } from 'src/app/@app-core/http';

@Component({
  selector: 'app-choose-question',
  templateUrl: './choose-question.page.html',
  styleUrls: ['./choose-question.page.scss'],
})
export class ChooseQuestionPage implements OnInit {
  headerCustom = { title: '' };

  questions = [];

  questionType = '';

  constructor(
    private router: Router,
    private questionaresService: QuestionaresService
  ) { }

  ngOnInit() {
    this.setUpQuestion();
  }

  ionViewWillEnter() {
    this.setUpQuestion();
  }

  setUpQuestion() {
    if(localStorage.getItem('questionType') == 'topic') {
      this.questionType = 'Chủ đề'
      this.headerCustom.title = 'CHỌN CHỦ ĐỀ';
      this.questions = [
        {name: 'Lời chúa'},
        {name: 'Các Thánh'},
        {name: 'Điều răn'},
        {name: 'Ngày lễ'},
        {name: 'Kinh Thánh'},
      ]
    }
    else if(localStorage.getItem('questionType') == 'level') {
      this.questionType = 'Cấp độ'
      this.headerCustom.title = 'CHỌN CẤP ĐỘ';
      this.questions = [
        {name: 'Khai tâm'},
        {name: 'Xưng tội'},
        {name: 'Thêm sức'},
        {name: 'Bao đồng'},
        {name: 'Hôn nhân'},
      ]
    }
    localStorage.removeItem('questionTypeName');
    if(localStorage.getItem('score')) {
      localStorage.removeItem('score');
    }
  }

  goToQuestion(name) {
    localStorage.setItem('questionTypeName', this.questionType + ' ' + name);
    localStorage.removeItem('questionType');
    this.router.navigate(['questionares/question']);
  }

}
