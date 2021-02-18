import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catechism-class',
  templateUrl: './catechism-class.page.html',
  styleUrls: ['./catechism-class.page.scss'],
})
export class CatechismClassPage implements OnInit {
  title = 'Lớp học giáo lý'

  catechismList = [
    {
      name: 'Giáo lý lớp 1-12',
      thumbImage: 'assets/img/catechism-menu-1.svg',
      desUrl: 'main/catechism-class/catechism'
    },
    {
      name: 'Giáo lý hôn nhân',
      thumbImage: 'assets/img/catechism-menu-2.svg',
      desUrl: 'main/catechism-class/catechism-marriage'
    }
  ]

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToCatechismDetail(catechism) {
    this.router.navigateByUrl(catechism.desUrl);
  }
}
