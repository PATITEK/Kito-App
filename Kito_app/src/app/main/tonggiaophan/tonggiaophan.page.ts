import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tonggiaophan',
  templateUrl: './tonggiaophan.page.html',
  styleUrls: ['./tonggiaophan.page.scss'],
})
export class TonggiaophanPage implements OnInit {
  title = '(Tổng) Giáo phận';

  constructor(
    private router: Router,
  ) {}

  ngOnInit() { }

  checkoutVatican() {
    this.router.navigateByUrl('main/tonggiaophan/parish-news');
  }
}
