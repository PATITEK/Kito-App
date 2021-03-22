import { Component, OnInit } from '@angular/core';
import { DioceseService } from 'src/app/@app-core/http/diocese';
import { IPageRequest } from 'src/app/@app-core/http/global/global.DTO';
import { LoadingService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-tonggiaophan',
  templateUrl: './tonggiaophan.page.html',
  styleUrls: ['./tonggiaophan.page.scss'],
})
export class TonggiaophanPage implements OnInit {
  headerCustom = { title: '(Tổng) Giáo phận' };
  pageRequest: IPageRequest = {}
  dioceses = [];
  holySee = {
    diocese_type: "vatican",
    name: "Tòa thánh Vatican",
    thumb_image: { url: "assets/img/tonggiaophan/vatican.jpg" }
  }

  constructor(
    private diocesesService: DioceseService,
    private loading: LoadingService
  ) { }

  ngOnInit() {
    this.loading.present();
    this.diocesesService.getAll(this.pageRequest).subscribe(data => {
      this.loading.dismiss();
      data.dioceses.forEach(diocese => {
        let hasNull = false;
        for (let i in diocese) {
          if (diocese[i] === null) {
            hasNull = true;
            break;
          }
        }
        !hasNull && this.dioceses.push(diocese);
      })
    })
  }

}
