import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-question',
  templateUrl: './choose-question.page.html',
  styleUrls: ['./choose-question.page.scss'],
})
export class ChooseQuestionPage implements OnInit {
  headerCustom = { title: '' };

  questions = [];

  questioneType = localStorage.getItem('questionType');

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.setUpQuestion();
  }

  ionViewWillEnter() {
    this.setUpQuestion();
  }

  setUpQuestion() {
    if(localStorage.getItem('questionType') == 'Chủ đề') {
      this.headerCustom.title = 'CHỌN CHỦ ĐỀ';
      this.questions = [
        {name: 'Lời chúa'},
        {name: 'Các Thánh'},
        {name: 'Điều răn'},
        {name: 'Ngày lễ'},
        {name: 'Kinh Thánh'},
      ]
    }
    else if(localStorage.getItem('questionType') == 'Cấp độ') {
      this.headerCustom.title = 'CHỌN CẤP ĐỘ';
      this.questions = [
        {name: 'Khai tâm'},
        {name: 'Xưng tội'},
        {name: 'Thêm sức'},
        {name: 'Bao đồng'},
        {name: 'Hôn nhân'},
      ]
    }
  }

  goToQuestion(name) {
    localStorage.setItem('questionTypeName', this.questioneType + ' ' + name);
    this.router.navigate(['questionares/question'])
  }

}
