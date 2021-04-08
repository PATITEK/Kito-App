import { QuestionaresService } from 'src/app/@app-core/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.page.html',
  styleUrls: ['./rank.page.scss'],
})
export class RankPage implements OnInit {
  headerCustom = { title: 'BẢNG XẾP HẠNG', background: 'transparent', color: '#fff' };
  ranking: any = [];
  constructor(
    private QuestionaresService: QuestionaresService
  ) { }

  ngOnInit() {
    this.getRanking();
  }

  getRanking() {
    this.QuestionaresService.getRanking().subscribe((data) => {
      this.ranking = data.app_users;
      let i = 1;
      for(let ranker of this.ranking) {
        ranker.index = i;
        i++;
      }
    })
  }
}
