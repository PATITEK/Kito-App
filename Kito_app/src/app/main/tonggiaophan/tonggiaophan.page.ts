import { Component, OnInit } from '@angular/core';
import { DioceseService } from 'src/app/@app-core/http/diocese';
import { IPageRequest } from 'src/app/@app-core/http/global/global.DTO';

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
    name: "Tin tức tòa thánh Vatican",
    thumb_image: { url: "assets/img/tonggiaophan/vatican.svg" }
  }

  constructor(
    private diocesesService: DioceseService,
  ) { }
  ngOnInit() {
    // this.loadingService.present();
    this.diocesesService.getAll(this.pageRequest).subscribe(data => {
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
      // this.loadingService.dismiss();
    })
  }
  
}
