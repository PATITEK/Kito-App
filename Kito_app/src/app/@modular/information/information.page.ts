import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { BishopService, IPageRequest, ParishesService, PopeService } from 'src/app/@app-core/http';
import { IPageParishes } from 'src/app/@app-core/http/parishes/parishes.DTO';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {
  @ViewChild('infiniteScroll') infiniteScroll: IonInfiniteScroll;

  headerCustom = { title: '' };
  list = [];
  pageRequestPope: IPageRequest = {
    page: 1,
    per_page: 5
  };
  pageRequestParish: IPageParishes = {
    page: 1,
    per_page: 10,
    diocese_id: null
  }
  pageRequestBishop: IPageParishes = {
    page: 1,
    per_page: 10,
    diocese_id: null
  }
  dataParams = null;

  constructor(
    private route: ActivatedRoute,
    private popeService: PopeService,
    private router: Router,
    private parishService: ParishesService,
    private bishopService: BishopService
  ) { }

  ngOnInit() {
    this.getParams();
  }

  getData(func?) {
    if (this.dataParams.id) {
      switch (this.dataParams.type.detail) {
        case 'parish':
          this.parishService.getAllWithDioceseId(this.pageRequestParish).subscribe(data => {
            data.parishes.forEach(v => v.type = this.dataParams.type);
            this.list = this.list.concat(data.parishes);
            func && func();
            this.pageRequestParish.page++;
            if (this.list.length >= data.meta.pagination.total_objects) {
              this.infiniteScroll.disabled = true;
            }
          })
          break;
        case 'bishop':
          this.bishopService.getAll(this.pageRequestBishop).subscribe(data => {
            data.bishop_infos.forEach(v => v.type = this.dataParams.type);
            this.list = this.list.concat(data.bishop_infos);
            func && func();
            this.pageRequestBishop.page++;
            if (this.list.length >= data.meta.pagination.total_objects) {
              this.infiniteScroll.disabled = true;
            }
          })
          break;
      }
    } else {
      switch (this.dataParams.type.detail) {
        case 'pope':
          this.popeService.getAll(this.pageRequestPope).subscribe(data => {
            data.pope_infos.forEach(v => v.type = this.dataParams.type);
            this.list = this.list.concat(data.pope_infos);
            func && func();
            this.pageRequestPope.page++;
            if (this.list.length >= data.meta.pagination.total_objects) {
              this.infiniteScroll.disabled = true;
            }
          })
          break;
      }
    }
  }

  getParams() {
    this.route.queryParams.subscribe(params => {
      this.dataParams = JSON.parse(params['data']);
      this.pageRequestBishop.diocese_id = this.dataParams.id;
      this.pageRequestParish.diocese_id = this.dataParams.id;
      switch (this.dataParams.type.general) {
        case 'info':
          this.headerCustom.title = 'Thông tin';
          break;
        case 'story':
          this.headerCustom.title = 'Tiểu sử';
          break;
      }
      this.getData();
    }).unsubscribe();
  }

  loadMoreData(event) {
    this.getData(() => {
      event.target.complete();
    })
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
