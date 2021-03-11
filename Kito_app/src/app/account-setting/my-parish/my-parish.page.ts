import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPageRequest, ParishesService, PopeService } from 'src/app/@app-core/http';
import { IPope } from 'src/app/@app-core/http/pope/pope.DTO';
import { LoadingService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-my-parish',
  templateUrl: './my-parish.page.html',
  styleUrls: ['./my-parish.page.scss'],
})
export class MyParishPage implements OnInit {
  tabNew = true;
  headerCustom = { title: 'Thông tin giáo xứ', background: '#e5e5e5' };
  pageRequest: IPageRequest = {
    page: 1,
    per_page: 100
  }
  myData = {
    myParish_id: '',
    myParish_image: '',
    myParish_title: '',
    myParish_info :''
  }
  listPriest = []
  news: any;
  popeRequest: IPope = {
    parish_id: this.myData.myParish_id,
    page: 1,
    per_page: 100
  }
  constructor( 
    private router: Router,
    private parishService: ParishesService,
    private loadingService: LoadingService,
    private popeService: PopeService) { }

  ngOnInit() {
    this.loadingService.present()
    this.myData.myParish_id = localStorage.getItem('parish_id');
    this.getPriest();
    this.myPrish();
  }
  myPrish() {
    this.parishService.getDetail(this.myData.myParish_id).subscribe(data => {
      this.loadingService.dismiss()
      const result = data.parish;
      this.imgnotFound(result)
      this.myData.myParish_image = result.thumb_image.url;
      this.myData.myParish_title = result.name;
      this.myData.myParish_info = result.parish_info.content;
    })
  }
  getUrl() {
    return `url(${this.myData.myParish_image})`
  }
  imgnotFound(item) {
    !item?.thumb_image?.url && (item.thumb_image = {url: "https://i.imgur.com/UKNky29.jpg"});
    }
    changeTabs() {
      if (this.tabNew) {
        this.tabNew = false;
      }
      else {
        this.tabNew = true;
      }
    }
  getPriest() {
      this.popeService.getAllByParish(this.popeRequest).subscribe(data => {
        !data?.pope_infos?.forEach(element => {
        this.imgnotFound(element)
        });
          this.listPriest = data.pope_infos;
          this.listPriest.forEach(e => {
              
          })
          console.log(this.listPriest)
      })
  }
  goToStoryDetail(item) {
    const data = {
      type: {
        general: 'story',
        detail: 'pope',
      },
      id: item.id
    }
    this.router.navigate(['/news-detail'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }
 
  counter(i: number) {
    return new Array(i);
  }
}
