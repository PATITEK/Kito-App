import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DioceseService } from 'src/app/@app-core/http/diocese';

@Component({
  selector: 'app-archdiocese-detail',
  templateUrl: './archdiocese-detail.page.html',
  styleUrls: ['./archdiocese-detail.page.scss'],
})
export class ArchdioceseDetailPage implements OnInit {
  headerCustom = { title: '' };
  archdiocese = {
    id: '',
    name: '',
    diocese_type: 'archdiocese',
    thumb_image: {
      url: ''
    }
  }

  list = [
    {
      heading: 'Tin tức tổng giáo phận',
      desUrl: 'main/tonggiaophan/parish-news/news',
      items: [
        {
          id: "1",
          type: 'News',
          title: 'ĐTC Phanxicô cử hành Thánh lễ Ngày Đời sống Thánh hiến',
          thumbImage: 'assets/img/parish-item.svg'
        },
        {
          id: "2",
          type: 'News',
          title: 'ĐTC Phanxicô cử hành Thánh lễ Ngày Đời sống Thánh hiến',
          thumbImage: 'assets/img/parish-item.svg'
        },
        {
          id: "3",
          type: 'News',
          title: 'ĐTC Phanxicô cử hành Thánh lễ Ngày Đời sống Thánh hiến',
          thumbImage: 'assets/img/parish-item.svg'
        },
        {
          id: "4",
          type: 'News',
          title: 'ĐTC Phanxicô cử hành Thánh lễ Ngày Đời sống Thánh hiến',
          thumbImage: 'assets/img/parish-item.svg'
        },
      ]
    },
    {
      heading: 'Tiểu sử các Đức Giám Mục',
      desUrl: 'main/tonggiaophan/parish-news/stories',
      items: [
        {
          id: "1",
          type: 'Story',
          title: 'Giáo hoàng Phanxicô - Đương kim giáo hoàng',
          thumbImage: 'assets/img/pope.svg'
        },
        {
          id: "2",
          type: 'Story',
          title: 'Giáo hoàng Phanxicô - Đương kim giáo hoàng',
          thumbImage: 'assets/img/pope.svg'
        },
        {
          id: "3",
          type: 'Story',
          title: 'Giáo hoàng Phanxicô - Đương kim giáo hoàng',
          thumbImage: 'assets/img/pope.svg'
        },
        {
          id: "4",
          type: 'Story',
          title: 'Giáo hoàng Phanxicô - Đương kim giáo hoàng',
          thumbImage: 'assets/img/pope.svg'
        },
      ]
    }
  ]

  constructor(
    private route: ActivatedRoute,
    private diocesesService: DioceseService,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getArchdiocese(id) {
    this.diocesesService.getDetail(id).subscribe(data => {
      this.archdiocese = data.diocese;
    })
  }

  getData() {
    this.route.queryParams.subscribe(params => {
      const archdiocese = JSON.parse(params['data']).archdiocese;
      this.headerCustom.title = archdiocese.name;
      this.getArchdiocese(archdiocese.id);
    }).unsubscribe();
  }
}
