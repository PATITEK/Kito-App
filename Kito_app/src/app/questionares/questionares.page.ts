import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questionares',
  templateUrl: './questionares.page.html',
  styleUrls: ['./questionares.page.scss'],
})
export class QuestionaresPage implements OnInit {
  headerCustom = { title: '', background:'transparent' };

  questions = [
    {name: 'Chơi theo chủ đề', type: 'topic'},
    {name: 'Chơi theo cấp độ', type: 'level'},
  ]
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    localStorage.removeItem('questionType');
    localStorage.removeItem('questionTypeName');
  }

  goToChooseQuestionType(type) {
    this.router.navigate(['questionares/choose-question']);
    localStorage.setItem('questionType', type);
  }

  rule() {
    this.router.navigate(['questionares/rule']);
  }

  quit() {
    this.router.navigate(['main/catechism-class']);
  }

}
