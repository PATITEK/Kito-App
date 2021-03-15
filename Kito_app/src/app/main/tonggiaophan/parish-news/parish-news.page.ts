import { Component, OnInit } from '@angular/core';
import { IPageRequest, VaticanService } from 'src/app/@app-core/http';
import { PopeService } from 'src/app/@app-core/http/pope';

@Component({
  selector: 'app-parish-news',
  templateUrl: './parish-news.page.html',
  styleUrls: ['./parish-news.page.scss'],
})
export class ParishNewsPage implements OnInit {
  headerCustom = { title: 'Tòa thánh Vatican' }

  list = [
    {
      heading: 'Tin tức Vatican',
      items: [],
      type: { general: 'news', detail: 'vatican' }
    },
    {
      heading: 'Tiểu sử các Đức Giáo Hoàng',
      items: [],
      type: { general: 'story', detail: 'pope' }
    }
  ]
  pageRequest: IPageRequest = {
    page: 1,
    per_page: 4
  }

  constructor(
    private vaticanService: VaticanService,
    private popeService: PopeService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getVatican() {
    this.vaticanService.getAll(this.pageRequest).subscribe(data => {
      data.vatican_news.forEach(v => v.type = this.list[0].type);
      this.list[0].items = data.vatican_news;
    })
  }

  getPope() {
    this.popeService.getAll(this.pageRequest).subscribe(data => {
      data.pope_infos.forEach(v => v.type = this.list[1].type);
      this.list[1].items = data.pope_infos;
    })
  }

  getData() {
    this.getVatican();
    this.getPope();
  }
}
