import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPageRequest, ParishesService, PopeService } from 'src/app/@app-core/http';
import { IPope } from 'src/app/@app-core/http/pope/pope.DTO';
import { LoadingService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  tabNew = true;
  title = 'Tin tức giáo xứ';
  headerCustom = { title: 'Tin tức giáo xứ', background: '#e5e5e5' };
  pageRequest: IPageRequest = {
    page: 1,
    per_page: 100
  }
  news: any;
  myData = {
    myParish_id: '',
    myParish_image: '',
    myParish_title: '',
    myParish_info :''

  }
  popeRequest: IPope = {
    parish_id: this.myData.myParish_id,
    page: 1,
    per_page: 100
  }
  
  // https://i.imgur.com/Vm39DR3.jpg
  constructor(
    private router: Router,
    private parishService: ParishesService,
    private loadingService: LoadingService,
    private popeService: PopeService
  ) { }
 
  ngOnInit() {
    this.loadingService.present()
    this.getAllParish();
    this.myData.myParish_id = localStorage.getItem('parish_id');
    this.myPrish();
    this.getPopes();
  }
  myPrish() {
    this.parishService.getDetail(this.myData.myParish_id).subscribe(data => {
      const result = data.parish;
      this.imgnotFound(result)
      this.myData.myParish_image = result.thumb_image.url;
      this.myData.myParish_title = result.name;
      this.myData.myParish_info = result.parish_info.content;
    })
  }
  changeTabs() {
    if (this.tabNew) {
      this.tabNew = false;
    }
    else {
      this.tabNew = true;
    }
  }
  counter(i: number) {
    return new Array(i);
  }
  imgnotFound(item) {
    !item?.thumb_image?.url && (item.thumb_image = {url: "https://i.imgur.com/UKNky29.jpg"});
    }
  getAllParish() {
    this.parishService.getAllNotidDioces(this.pageRequest).subscribe(data => {
      this.news = data.parishes;
      this.news.forEach(element => {
        this.imgnotFound(element);
        this.loadingService.dismiss();
      });
    })
  }
  getPopes() {
      this.popeService.getAllByParish(this.popeRequest).subscribe(data => {
          console.log(data);
      })
  }
  getUrl() {
    return `url(${this.myData.myParish_image})`
  }
  goToStoryDetail() {

  }
  goToNewsDetail() {
    const data = {
      type: {
        general: 'news',
        detail: 'parish',
      }
    }
    this.router.navigate(['/news'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }
}
