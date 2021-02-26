import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DioceseNewsService, IPageRequest, VaticanService } from 'src/app/@app-core/http';
import { IPageParishes } from 'src/app/@app-core/http/parishes/parishes.DTO';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  headerCustom = { title: 'Tin tức' };
  news = [];
  pageRequestVatican: IPageRequest = {
    page: 1,
    per_page: 10
  }
  pageRequestDioceseNews: IPageParishes = {
    page: 1,
    per_page: 10,
    diocese_id: ''
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vaticanService: VaticanService,
    private dioceseNewsService: DioceseNewsService
  ) { }

  ngOnInit() {
    this.getData();
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

  getData() {
    this.route.queryParams.subscribe(params => {
      const dataPrams = JSON.parse(params['data']);
      if (dataPrams.id) {
        this.pageRequestDioceseNews.diocese_id = dataPrams.id;
        switch (dataPrams.type.detail) {
          case 'dioceseNews':
            this.dioceseNewsService.getAll(this.pageRequestDioceseNews).subscribe(data => {
              data.diocese_news.forEach(v => v.type = dataPrams.type);
              this.news = data.diocese_news;
            })
            break;
        }
      } else {
        switch (dataPrams.type.detail) {
          case 'vatican':
            this.vaticanService.getAll(this.pageRequestVatican).subscribe(data => {
              data.vatican_news.forEach(v => v.type = dataPrams.type);
              this.news = data.vatican_news;
            })
            break;
        }
      }
    }).unsubscribe();
  }
}
