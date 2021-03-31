import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParishesService } from 'src/app/@app-core/http';

@Component({
  selector: 'app-select-parish',
  templateUrl: './select-parish.page.html',
  styleUrls: ['./select-parish.page.scss'],
})
export class SelectParishPage implements OnInit {
  headerCustom = { title: 'Chọn giáo xứ' };
  list = [];

  constructor(
    private router: Router,
    private parishService: ParishesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.route.queryParams.subscribe(params => {
      this.parishService.getAllWithDioceseId({
        page: 1,
        per_page: 10,
        diocese_id: JSON.parse(params['data']).id
      }).subscribe(data => {
        this.list = data.parishes;
      })
    })
  }

  select(item) {
    localStorage.setItem('tempParishId', item.id);
    this.router.navigateByUrl('main/prayer-time');
  }
}
