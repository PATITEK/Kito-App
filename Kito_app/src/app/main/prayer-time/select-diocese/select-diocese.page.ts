import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DioceseNewsService, DioceseService, IPageRequest } from 'src/app/@app-core/http';

@Component({
  selector: 'app-select-diocese',
  templateUrl: './select-diocese.page.html',
  styleUrls: ['./select-diocese.page.scss'],
})
export class SelectDiocesePage implements OnInit {
  headerCustom = {title: 'Chọn giáo phận'};
  list = [];
  pageRequest: IPageRequest = {
    page: 1,
    per_page: 10
  }

  constructor(
    private router: Router,
    private dioceseService: DioceseService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.dioceseService.getAll(this.pageRequest).subscribe(data => {
      this.list = data.dioceses;
    })
  }

  goToSelectParish(item) {
    const data = {
      id: item.id,
    }
    this.router.navigate(['main/prayer-time/select-parish'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }
}
