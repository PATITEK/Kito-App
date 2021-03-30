import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.page.html',
  styleUrls: ['./rank.page.scss'],
})
export class RankPage implements OnInit {
  headerCustom = { title: ' ', background:'transparent' };
  data: any = [];
  constructor() { }

  ngOnInit() {
    for(let i=0; i<=12; i++) {
      this.data.push({
        name: 'Hoang An Pede' + i,
        index: i+1,
        point: 100000
      })
    }
  }
}
