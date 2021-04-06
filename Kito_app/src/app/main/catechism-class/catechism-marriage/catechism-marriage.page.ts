import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DoctrineService, IPageRequest, LOADING } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-catechism-marriage',
  templateUrl: './catechism-marriage.page.html',
  styleUrls: ['./catechism-marriage.page.scss'],
})
export class CatechismMarriagePage implements OnInit {
  headerCustom: any;
  list = [];
  public pageResult: IPageRequest = {
    page: 1,
    per_page: 1000,
    total_objects: 0,
    search: '',
  };
  constructor(
    private route: ActivatedRoute,
    private doctrineService:DoctrineService,
    private loadingService:LoadingService
    ) { }

  ngOnInit() {
    this.getDataName();
  }
  getDataName() {
    this.route.queryParams.subscribe(data => {
      this.headerCustom = { title: data.data };
      // const rand = Math.floor(Math.random() * (20 - 1 + 1) + 1);
      // for (let i = 1; i <= rand; i++) {
      //   this.list.push({
      //     name: data.data + ' ' + i,
      //     time: '7h30 - 9h30',
      //     day: 'Chủ nhật hàng tuần',
      //     room: 'Phòng học 01',
      //     canRegister: Math.floor(Math.random() * 2) == 0
      //   })
      // }
      if (data.id ==="1")
      {
        this.doctrineService.getAll(this.pageResult).subscribe((data: any) => {
          this.list = data.doctrine_classes;
        })
      }
      else{
        this.doctrineService.getCateckism(this.pageResult).subscribe((data: any) => {
          this.list = data.doctrine_classes;
        })
      }
      
    })
  }
  register(item)
  {
    this.loadingService.present(LOADING.REGIEST)
    let data={
      "register_detail":{
        "doctrine_class_id":item
      }
    }
    this.doctrineService.register(data).subscribe((data)=>{
      this.getDataName();
      this.loadingService.dismiss();
    })
    
  }
  unregister(item) {
    this.loadingService.present(LOADING.UNREGIEST);
    let data = {
      "register_detail": {
        "doctrine_class_id": item
      }
    }
    this.doctrineService.unregister(data).subscribe((data) => {
      this.getDataName();
      this.loadingService.dismiss();
    })
   
  }
  formatTime(date) {
    date = new Date(date);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + 'h' + ':' + minutes
    return strTime
  }
}
