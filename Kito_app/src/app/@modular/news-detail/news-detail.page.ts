import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
})
export class NewsDetailPage implements OnInit {
  headerCustom = {title: ''};
  data = {
    title: 'Giáo xứ Đức Mẹ Hằng Cứu Giúp ',
    thumbImage: 'assets/img/parish-item.svg',
    content: [
      {
        title: 'Bối cảnh lịch sử 1',
        text: 'Giáo xứ ĐMHCG được thành lập vào năm 1963, đến nay (2013) vừa tròn 50 năm, và được kể là một Giáo xứ non trẻ so với các Giáo xứ kỳ cựu của Giáo phận Sài Gòn, nhất là hai trong các giáo xứ mẹ: Giáo xứ Chợ Đũi, thành lập năm 1859 (cách nay 154 năm) và Giáo xứ Tân Định, thành lập năm 1860 (cách nay 153 năm). Giáo xứ ĐMHCG được giao cho Dòng Chúa Cứu Thế coi sóc. Vì thế, linh mục chánh xứ là một linh mục Dòng Chúa Cứu Thế do Bề trên Dòng cử ra và được Tòa Tổng Giám mục chấp thuận. Giáo xứ ĐMHCG được thành lập vào năm 1963, đến nay (2013) vừa tròn 50 năm, và được kể là một Giáo xứ non trẻ so với các Giáo xứ kỳ cựu của Giáo phận Sài Gòn, nhất là hai trong các giáo xứ mẹ: Giáo xứ Chợ Đũi, thành lập năm 1859 (cách nay 154 năm) và Giáo xứ Tân Định, thành lập năm 1860 (cách nay 153 năm). Giáo xứ ĐMHCG được giao cho Dòng Chúa Cứu Thế coi sóc. Vì thế, linh mục chánh xứ là một linh mục Dòng Chúa Cứu Thế do Bề trên Dòng cử ra và được Tòa Tổng Giám mục chấp thuận'
      },
      {
        title: 'Bối cảnh lịch sử 2',
        text: 'Giáo xứ ĐMHCG được thành lập vào năm 1963, đến nay (2013) vừa tròn 50 năm, và được kể là một Giáo xứ non trẻ so với các Giáo xứ kỳ cựu của Giáo phận Sài Gòn, nhất là hai trong các giáo xứ mẹ: Giáo xứ Chợ Đũi, thành lập năm 1859 (cách nay 154 năm) và Giáo xứ Tân Định, thành lập năm 1860 (cách nay 153 năm). Giáo xứ ĐMHCG được giao cho Dòng Chúa Cứu Thế coi sóc. Vì thế, linh mục chánh xứ là một linh mục Dòng Chúa Cứu Thế do Bề trên Dòng cử ra và được Tòa Tổng Giám mục chấp thuận. Giáo xứ ĐMHCG được thành lập vào năm 1963, đến nay (2013) vừa tròn 50 năm, và được kể là một Giáo xứ non trẻ so với các Giáo xứ kỳ cựu của Giáo phận Sài Gòn, nhất là hai trong các giáo xứ mẹ: Giáo xứ Chợ Đũi, thành lập năm 1859 (cách nay 154 năm) và Giáo xứ Tân Định, thành lập năm 1860 (cách nay 153 năm). Giáo xứ ĐMHCG được giao cho Dòng Chúa Cứu Thế coi sóc. Vì thế, linh mục chánh xứ là một linh mục Dòng Chúa Cứu Thế do Bề trên Dòng cử ra và được Tòa Tổng Giám mục chấp thuận'
      }
    ]
  }

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const dataParams = JSON.parse(params['data']);
      this.headerCustom.title = dataParams.type == 'News' ? 'Thông tin' : 'Tiểu sử';
    })
  }


}
