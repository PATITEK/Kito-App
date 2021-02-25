import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPageRequest, ParishesService, PopeService } from 'src/app/@app-core/http';
import { IPageParishes } from 'src/app/@app-core/http/parishes/parishes.DTO';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {
  headerCustom = { title: '' };
  list = [];
  pageRequestPope: IPageRequest = {
    page: 1,
    per_page: 10
  };
  pageRequestParish: IPageParishes = {
    page: 1,
    per_page: 10,
    diocese_id: ''
  }

  constructor(
    private route: ActivatedRoute,
    private popeService: PopeService,
    private router: Router,
    private parishService: ParishesService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.route.queryParams.subscribe(params => {
      const dataParams = JSON.parse(params['data']);

      switch (dataParams.type.general) {
        case 'info':
          this.headerCustom.title = 'Thông tin';
          break;
        case 'story':
          this.headerCustom.title = 'Tiểu sử';
          break;
      }

      if (dataParams.id) {
        this.pageRequestParish.diocese_id = dataParams.id;
        this.parishService.getAll(this.pageRequestParish).subscribe(data => {
          data.parishes.forEach(v => v.type = dataParams.type);
          this.list = data.parishes;
        })
      } else {
        switch (dataParams.type.detail) {
          case 'pope':
            this.popeService.getAll(this.pageRequestPope).subscribe(data => {
              data.pope_infos.forEach(v => v.type = dataParams.type);
              this.list = data.pope_infos;
            })
            break;
        }
      }
    }).unsubscribe();
  }

  goToNewsDetail(item) {
    const data = {
      id: item.id,
      type: item.type
    }
    this.router.navigate(['/news-detail'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }
}
