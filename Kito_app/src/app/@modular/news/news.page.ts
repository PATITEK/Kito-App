import { IonInfiniteScroll } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DioceseNewsService, IPageRequest, ParishesService, VaticanService } from 'src/app/@app-core/http';
import { IPageParishes } from 'src/app/@app-core/http/parishes/parishes.DTO';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  @ViewChild('infiniteScroll') infiniteScroll: IonInfiniteScroll;

  headerCustom = { title: 'Tin tức' };
  news = [];
  pageRequestVatican: IPageRequest = {
    page: 1,
    per_page: 10
  }
  pageRequestDioceseNews: IPageParishes = {
    page: 1,
    per_page: 10,
    diocese_id: null
  }
  pageRequestParish: IPageParishes = {
    parish_id: localStorage.getItem('parish_id'),
    page: 1,
    per_page: 10,
  }
  day: any;
  dataParams = null;
  check = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vaticanService: VaticanService,
    private dioceseNewsService: DioceseNewsService,
    private parishesService: ParishesService
  ) { }

  ngOnInit() {
    this.getParams();
    var orthers = document.getElementById('orthers');
    var current =  document.getElementById('current');
    current.addEventListener('mouseover', ()=>{
      console.log('hihi');
      orthers.style.display = 'block';
    });
    current.addEventListener('mouseout',()=>{
      orthers.style.display = 'none';
    })
    current.addEventListener('click', ()=>{
      if(!this.check) {
        orthers.style.display = 'block';
        this.check = true;
      }
      else {
        orthers.style.display = 'none';
        this.check = false;
      }
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

  getData(func?) {
    if (this.dataParams.id) {
      switch (this.dataParams.type.detail) {
        case 'dioceseNews':
          this.dioceseNewsService.getAll(this.pageRequestDioceseNews).subscribe(data => {
            data.diocese_news.forEach(element => {
              element.type = this.dataParams.type
              element.time = element.created_at.slice(11, 16)
              element.yymmdd = element.created_at.slice(0, 10);
            });
            this.news = this.news.concat(data.diocese_news);
            func && func();
            this.pageRequestDioceseNews.page++;
            if (this.news.length >= data.meta.pagination.total_objects) {
              this.infiniteScroll.disabled = true;
            }
          })
          break;
        case 'parish_news':
          this.headerCustom.title = 'Tin tức Giáo xứ'
          this.parishesService.getAllNewsByParish(this.pageRequestParish).subscribe(data => {
            data.parish_news.forEach(element => {
              element.type = this.dataParams.type;
              this.imgnotFound(element);
              element.time = element.created_at.slice(11, 16)
              element.yymmdd = element.created_at.slice(0, 10);
            });
            this.news = this.news.concat(data.parish_news);
            func && func();
            this.pageRequestParish.page++;
            if (this.news.length >= data.meta.pagination.total_objects) {
              this.infiniteScroll.disabled = true;
            }
          })
          break;
      }
    } else {
      switch (this.dataParams.type.detail) {
        case 'vatican':
          this.vaticanService.getAll(this.pageRequestVatican).subscribe(data => {
            data.vatican_news.forEach(element => {
              element.type = this.dataParams.type
              element.time = element.created_at.slice(11, 16)
              element.yymmdd = element.created_at.slice(0, 10);
            });
            this.news = this.news.concat(data.vatican_news);
            func && func();
            this.pageRequestVatican.page++;
            if (this.news.length >= data.meta.pagination.total_objects) {
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
      this.pageRequestDioceseNews.diocese_id = this.dataParams.id;
      this.getData();
    }).unsubscribe();
  }

  loadMoreData(event) {
    this.getData(() => {
      event.target.complete();
    });
  }

  imgnotFound(item) {
    !item?.thumb_image?.url && (item.thumb_image = { url: "https://i.imgur.com/UKNky29.jpg" });
  }
}
