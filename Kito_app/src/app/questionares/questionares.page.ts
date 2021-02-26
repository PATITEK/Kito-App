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
    {name: 'Chơi theo chủ đề', type: 'Chủ đề'},
    {name: 'Chơi theo cấp độ', type: 'Cấp độ'},
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

  quit() {
    this.router.navigate(['main']);
  }

}
