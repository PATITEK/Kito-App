import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questionares',
  templateUrl: './questionares.page.html',
  styleUrls: ['./questionares.page.scss'],
})
export class QuestionaresPage implements OnInit {
  headerCustom = { title: 'ĐỐ VUI GIÁO LÝ' };

  questions = [
    {name: 'Chơi theo chủ đề', type: 'topic'},
    {name: 'Chơi theo cấp độ', type: 'level'},
  ]
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  goToChooseQuestionType(type) {
    this.router.navigate(['questionares/choose-question'])
    localStorage.setItem('type', type);
  }

}
