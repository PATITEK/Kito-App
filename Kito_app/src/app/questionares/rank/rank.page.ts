import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.page.html',
  styleUrls: ['./rank.page.scss'],
})
export class RankPage implements OnInit {
  headerCustom = { title: ' ', background:'transparent' };
  constructor() { }

  ngOnInit() {
  }
  numSequence(n: number): Array<number> {
    return Array(n);
  }

}
