import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VaticanService } from 'src/app/@app-core/http';

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
    content: ''
  }

  constructor(
    private route: ActivatedRoute,
    private vaticanService: VaticanService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const dataParams = JSON.parse(params['data']);
      this.headerCustom.title = dataParams.type.general == 'news' ? 'Thông tin' : 'Tiểu sử';
      switch (dataParams.type.detail) {
        case 'vatican':
          this.vaticanService.getDetail(dataParams.id).subscribe(data => {
            this.data = data.vatican_news;
          })
          break;
      }
    })
  }


}
