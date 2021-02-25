import { Component, OnInit } from '@angular/core';
import { IPageRequest, VaticanService } from 'src/app/@app-core/http';

@Component({
  selector: 'app-parish-news',
  templateUrl: './parish-news.page.html',
  styleUrls: ['./parish-news.page.scss'],
})
export class ParishNewsPage implements OnInit {
  headerCustom = {}

  list = [
    {
      heading: 'Tin tức tòa thánh Vatican',
      desUrl: 'main/tonggiaophan/parish-news/news',
      items: [],
      type: 'vatican'
    },
    {
      heading: 'Tiểu sử các Đức Giáo Hoàng',
      desUrl: 'main/tonggiaophan/parish-news/stories',
      items: []
    }
  ]
  pageRequest: IPageRequest = {
    page: 1,
    per_page: 4
  }

  constructor(
    private vaticanService: VaticanService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getVatican() {
    this.vaticanService.getAll(this.pageRequest).subscribe(data => {
      data.vatican_news.forEach(v => v.type = { general: 'news', detail: 'vatican' });
      this.list[0].items = data.vatican_news;
    })
  }

  getData() {
    this.getVatican();
  }
}
