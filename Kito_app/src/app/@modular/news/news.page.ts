import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DioceseNewsService, IPageRequest, ParishesService, VaticanService } from 'src/app/@app-core/http';
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
    diocese_id: 1
  }
  pageRequestParishNews: IPageParishes = {
    page: 1,
    per_page: 10,

  }
  pageRequestParish: IPageParishes = {
    parish_id: localStorage.getItem('parish_id'),
    page: 1,
    per_page: 10,

  }
  time = [{
    year: '',
    month: '',
    day: '',
    time: ''
  }]
  day: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vaticanService: VaticanService,
    private dioceseNewsService: DioceseNewsService,
    private parishesService: ParishesService
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
      const dataParams = JSON.parse(params['data']);
      if (dataParams.id) {
        this.pageRequestDioceseNews.diocese_id = dataParams.id;
        switch (dataParams.type.detail) {
          case 'dioceseNews':
            this.dioceseNewsService.getAll(this.pageRequestDioceseNews).subscribe(data => {
              data.diocese_news.forEach(v => v.type = dataParams.type);
              this.news = data.diocese_news;
            })
          case 'parish':
            this.headerCustom.title = 'Tin tức Giáo xứ'
            this.parishesService.getAllNewsByParish(this.pageRequestParish).subscribe(data => {
              data.parish_news.forEach(element => {
                  this.imgnotFound(element);
                  element['time'] = element.created_at.slice(11,16)
                  element['yymmdd'] =  element.created_at.slice(0,10);
              });
              this.news = data.parish_news;
            })
            break;
        }
      } else {
        switch (dataParams.type.detail) {
          case 'vatican':
            this.vaticanService.getAll(this.pageRequestVatican).subscribe(data => {
              console.log(data)
              data.vatican_news.forEach(v => v.type = dataParams.type);
              this.news = data.vatican_news;
            })

            break;
        }
      }
    }).unsubscribe();
  }
  imgnotFound(item) {
    !item?.thumb_image?.url && (item.thumb_image = {url: "https://i.imgur.com/UKNky29.jpg"});
  }
  
}
