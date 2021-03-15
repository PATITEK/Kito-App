import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DioceseService, IPageRequest, ParishesService } from 'src/app/@app-core/http';
import { IPageParishes } from 'src/app/@app-core/http/parishes/parishes.DTO';
import { LoadingService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-select-diocese',
  templateUrl: './select-diocese.page.html',
  styleUrls: ['./select-diocese.page.scss'],
})
export class SelectDiocesePage implements OnInit {
  headerCustom = { title: '' };
  list = [];
  pageRequestDiocese: IPageRequest = {
    page: 1,
    per_page: 10
  }
  pageRequestParish: IPageParishes = {
    page: 1,
    per_page: 10,
    diocese_id: null
  }
  type = null;

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private dioceseService: DioceseService,
    private parishService: ParishesService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const dataParams = JSON.parse(params['data']);
      this.type = dataParams.type;
      switch (this.type) {
        case 'diocese':
          this.headerCustom.title = 'Chọn giáo phận';
          this.getDioceses();
          break;
        case 'parish':
          this.headerCustom.title = 'Chọn giáo xứ';
          this.getParishes(dataParams.dioceseId);
          break;
      }
    })
  }

  getDioceses() {
    this.dioceseService.getAll(this.pageRequestDiocese).subscribe(data => {
      this.list = data.dioceses;
    })
  }

  getParishes(id) {
    this.pageRequestParish.diocese_id = id;
    this.parishService.getAll(this.pageRequestParish).subscribe(data => {
      this.list = data.parishes;
    })
  }

  setItem(item, type) {
    localStorage.setItem(type, JSON.stringify(item.id));
  }

  goBack() {
    this.navController.back();
  }

  choose(item) {
    switch (this.type) {
      case 'diocese':
        const prevId = JSON.parse(localStorage.getItem('diocese_id'));
        if (prevId !== item.id) {
          this.loadingService.present();
          this.parishService.getAll({ page: 1, per_page: 1, diocese_id: item.id }).subscribe(
            data => {
              const parish = data.parishes[0];
              if (parish) {
                this.setItem(item, 'diocese_id');
                this.setItem(parish, 'parish_id');
              }
              this.loadingService.dismiss();
              this.goBack();
            },
            () => {
              this.loadingService.dismiss();
              this.goBack();
            }
          )
        } else {
          this.goBack();
        }
        break;
      case 'parish':
        this.setItem(item, 'parish_id');
        this.goBack();
        break;
    }
  }
}
