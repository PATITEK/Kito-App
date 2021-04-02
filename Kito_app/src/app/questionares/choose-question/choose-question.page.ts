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

  towel = ['http://res.cloudinary.com/no-nam/image/upload/v1617325525/hw2rzekyxbl3dznilc4z.png', 
           'http://res.cloudinary.com/no-nam/image/upload/v1617325552/woxsl5pubxum50rrfm33.png', 
           'http://res.cloudinary.com/no-nam/image/upload/v1617325576/akfotmqptkwc0jxzqpew.png', 
           'http://res.cloudinary.com/no-nam/image/upload/v1617325593/go0sdwaizia15powjjmf.png', 
           'http://res.cloudinary.com/no-nam/image/upload/v1617325525/hw2rzekyxbl3dznilc4z.png'];
  
  god = ['http://res.cloudinary.com/no-nam/image/upload/v1617325224/fuqvqppx5nkrhnnjxgrm.jpg',
         'http://res.cloudinary.com/no-nam/image/upload/v1617325283/vbmgw4lvbvg1m8sxfkdo.jpg',
         'http://res.cloudinary.com/no-nam/image/upload/v1617325313/d9hfdthjzwmacpdehpys.jpg',
         'http://res.cloudinary.com/no-nam/image/upload/v1617325346/vgr7xuy3a6q6a7cbbr8i.jpg',
         'http://res.cloudinary.com/no-nam/image/upload/v1617325375/akjwsx6xvwo1oeleehn1.jpg']

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
        for(let i=0; i<this.questions.length; i++) {
          this.questions[i].img = this.god[i];
        }
        console.log(this.questions)
      })
      this.questionType = 'Chủ đề'
      this.title = 'CHỌN CHỦ ĐỀ';
    }
    else if(localStorage.getItem('questionType') == 'level') {
      this.questionaresService.getLevel().subscribe((data) => {
        this.questions = data;
        for(let i=0; i<this.questions.length; i++) {
          this.questions[i].img = this.towel[i];
        }
        console.log(this.questions)
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
