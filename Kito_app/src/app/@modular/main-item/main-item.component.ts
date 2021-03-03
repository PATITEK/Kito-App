import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-item',
  templateUrl: './main-item.component.html',
  styleUrls: ['./main-item.component.scss'],
})
export class MainItemComponent implements OnInit {
  @Input() data: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  goToDetail() {
    this.router.navigate(['main/tonggiaophan/parish-news']);
  }
}
