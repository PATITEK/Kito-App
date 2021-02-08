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
      id: '1',
      name: 'Giáo lý lớp 1-12',
      thumbImage: 'assets/img/catechism-menu-1.svg'
    },
    {
      id: '2',
      name: 'Giáo lý hôn nhân',
      thumbImage: 'assets/img/catechism-menu-2.svg'
    }
  ]

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToCatechismDetail(catechism) {
    const data = {
      id: catechism.id
    }
    // this.router.navigate([''], {
    //   queryParams: {
    //     data: JSON.stringify(data)
    //   }
    // })
  }
}
