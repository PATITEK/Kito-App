import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BishopService, DioceseNewsService, DioceseService, ParishesService, VaticanService } from 'src/app/@app-core/http';
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
    name: '',
    thumb_images: [{ url: '' }],
    thumb_image: { url: '' },
    content: ''
  }

  constructor(
    private route: ActivatedRoute,
    private vaticanService: VaticanService,
    private popeService: PopeService,
    private dioceseService: DioceseService,
    private parishService: ParishesService,
    private dioceseNewsService: DioceseNewsService,
    private bishopService: BishopService
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
        case 'parish':
          this.headerCustom.title = 'Tin tức Giáo xứ'
        case 'parish_news':
          this.headerCustom.title = 'Tin tức Giáo xứ'
          break;
      }
      switch (dataParams.type.detail) {
        case 'vatican':
          this.vaticanService.getDetail(dataParams.id).subscribe(data => {
            this.data = data.vatican_news;
            this.imgnotFound(this.data);
          })
          break;
        case 'pope':
          this.popeService.getDetail(dataParams.id).subscribe(data => {
            this.data = data.pope_info;
            this.imgnotFound(this.data);
          })
          break;
        case 'diocese':
          this.dioceseService.getDetail(dataParams.id).subscribe(data => {
            this.data = data.diocese;
            this.imgnotFound(this.data);
          })
          break;
        case 'parish':
          this.parishService.getDetail(dataParams.id).subscribe(data => {
            this.data = data.parish;
            this.imgnotFound(this.data);
          })
        case 'parish_news':
          this.parishService.getParishNewsByid(dataParams.id).subscribe(data => {
            this.imgnotFound(data?.parish_news);
            this.data = data.parish_news;
          })
          break;
        case 'dioceseNews':
          this.dioceseNewsService.getDetail(dataParams.id).subscribe(data => {
            this.data = data.diocese_news;
            this.imgnotFound(this.data);
          })
          break;
        case 'bishop':
          this.bishopService.getDetail(dataParams.id).subscribe(data => {
            this.data = data.bishop_info;
            this.imgnotFound(this.data);
          })
          break;
      }
    })
  }
  imgnotFound(item) {
    !item?.thumb_image?.url && (item.thumb_image = {url: "https://i.imgur.com/UKNky29.jpg"});
    }
}
