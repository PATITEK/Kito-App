import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPageRequest, VaticanService } from 'src/app/@app-core/http';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  headerCustom = { title: 'Tin tức' };
  news = [];
  pageRequest: IPageRequest = {
    page: 1,
    per_page: 10
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vaticanService: VaticanService
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
      switch (dataPrams.type.detail) {
        case 'vatican':
          this.vaticanService.getAll(this.pageRequest).subscribe(data => {
            data.vatican_news.forEach(v => v.type = dataPrams.type);
            this.news = data.vatican_news;
          })
          break;
      }
    }).unsubscribe();
  }
}
