import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DioceseService, ParishesService, VaticanService } from 'src/app/@app-core/http';
import { PopeService } from 'src/app/@app-core/http/pope';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
})
export class NewsDetailPage implements OnInit {
  headerCustom = { title: '' };
  data = {
    title: '',
    thumb_images: [{ url: '' }],
    thumb_image: { url: '' },
    content: ''
  }

  constructor(
    private route: ActivatedRoute,
    private vaticanService: VaticanService,
    private popeService: PopeService,
    private dioceseService: DioceseService,
    private parishService: ParishesService
  ) { }

  ngOnInit() {
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
          break;
      }

      switch (dataParams.type.detail) {
        case 'vatican':
          this.vaticanService.getDetail(dataParams.id).subscribe(data => {
            this.data = data.vatican_news;
          })
          break;
        case 'pope':
          this.popeService.getDetail(dataParams.id).subscribe(data => {
            this.data = data.pope_info;
          })
          break;
        case 'diocese':
          this.dioceseService.getDetail(dataParams.id).subscribe(data => {
            this.data = data.diocese;
          })
          break;
        case 'parish':
          this.parishService.getDetail(dataParams.id).subscribe(data => {
            this.data = data.parish;
          })
          break;
      }
    })
  }
}
