import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-question',
  templateUrl: './choose-question.page.html',
  styleUrls: ['./choose-question.page.scss'],
})
export class ChooseQuestionPage implements OnInit {
  headerCustom = { title: '' };

  questions = [];

  constructor() { }

  ngOnInit() {
    this.setUpQuestion();
  }

  ionViewWillEnter() {
    this.setUpQuestion();
  }

  setUpQuestion() {
    if(localStorage.getItem('type') == 'topic') {
      this.headerCustom.title = 'CHỌN CHỦ ĐỀ';
      this.questions = [
        {name: 'Lời chúa'},
        {name: 'Các Thánh'},
        {name: 'Điều răn'},
        {name: 'Ngày lễ'},
        {name: 'Kinh Thánh'},
      ]
    }
    else if(localStorage.getItem('type') == 'level') {
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

}
