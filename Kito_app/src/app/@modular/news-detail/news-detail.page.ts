import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BishopService, DioceseNewsService, DioceseService, ParishesService, VaticanService } from 'src/app/@app-core/http';
import { PopeService } from 'src/app/@app-core/http/pope';
import { LoadingService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
})
export class NewsDetailPage implements OnInit {
  headerCustom = { title: '' };
  data = null;

  constructor(
    private route: ActivatedRoute,
    private vaticanService: VaticanService,
    private popeService: PopeService,
    private dioceseService: DioceseService,
    private parishService: ParishesService,
    private dioceseNewsService: DioceseNewsService,
    private bishopService: BishopService,
    private loading: LoadingService
  ) { }

  ngOnInit() {
    this.loading.present();
    this.route.queryParams.subscribe(params => {
      const dataParams = JSON.parse(params['data']);
      switch (dataParams.type.general) {
        case 'news':
          this.headerCustom.title = 'Tin tức';
          break;
        case 'info':
          this.headerCustom.title = 'Thông tin';
          break;
        case 'story':
          this.headerCustom.title = 'Tiểu sử';
        case 'parish':
          this.headerCustom.title = 'Thông tin';
          break;
      }
      switch (dataParams.type.detail) {
        case 'vatican':
          this.vaticanService.getDetail(dataParams.id).subscribe(data => {
            this.loading.dismiss();
            this.data = data.vatican_news;
            this.imgnotFound(this.data);
          })
          break;
        case 'pope':
          this.popeService.getDetail(dataParams.id).subscribe(data => {
            this.loading.dismiss();
            this.data = data.pope_info;
            this.imgnotFound(this.data);
          })
          break;
        case 'diocese':
          this.dioceseService.getDetail(dataParams.id).subscribe(data => {
            this.loading.dismiss();
            this.data = data.diocese;
            this.imgnotFound(this.data);
          })
          break;
        case 'parish':
          this.parishService.getDetail(dataParams.id).subscribe(data => {
            this.loading.dismiss();
            this.data = data.parish;
            this.imgnotFound(this.data);
          })
          break;
        case 'parish_news':
          this.parishService.getParishNewsByid(dataParams.id).subscribe(data => {
            this.loading.dismiss();
            this.imgnotFound(data?.parish_news);
            this.data = data.parish_news;
          })
          break;
        case 'dioceseNews':
          this.dioceseNewsService.getDetail(dataParams.id).subscribe(data => {
            this.loading.dismiss();
            this.data = data.diocese_news;
            this.imgnotFound(this.data);
          })
          break;
        case 'bishop':
          this.bishopService.getDetail(dataParams.id).subscribe(data => {
            this.loading.dismiss();
            this.data = data.bishop_info;
            this.imgnotFound(this.data);
          })
          break;
      }
    })
  }
  imgnotFound(item) {
    !item?.thumb_image?.url && (item.thumb_image = { url: "https://i.imgur.com/UKNky29.jpg" });
  }
  goToMap() {
    window.open('https://www.google.com/maps/dir/?api=1&destination=' + this.data.location.lat + ',' + this.data.location.long);
  }
}
