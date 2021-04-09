import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DoctrineService, IPageRequest, LOADING } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/utils';
import { ModalController } from '@ionic/angular';
import { ModalResComponent } from 'src/app/@modular/modal-res/modal-res.component';

@Component({
  selector: 'app-catechism-marriage',
  templateUrl: './catechism-marriage.page.html',
  styleUrls: ['./catechism-marriage.page.scss'],
})
export class CatechismMarriagePage implements OnInit {
  headerCustom: any;
  list = [];
  id;
  public pageResult: IPageRequest = {
    page: 1,
    per_page: 1000,
    total_objects: 0,
    search: '',
  };
  constructor(
    private route: ActivatedRoute,
    private doctrineService: DoctrineService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      this.headerCustom = { title: data.data };
      this.id = data.id
    })
    this.getDataName();
  }
  getDataName() {
    if (this.id === "1") {
      this.doctrineService.getAll(this.pageResult).subscribe((data: any) => {
        this.list = data.doctrine_classes;
      })
      return
    }
    
      this.doctrineService.getCateckism(this.pageResult).subscribe((data: any) => {
        this.list = data.doctrine_classes;
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
  async openModalRegister(item, type) {
    const modal = await this.modalController.create({
      component: ModalResComponent,
      swipeToClose: true,
      cssClass: 'modalFood',
      componentProps: {
        id: item,
        type: type
      }
    }
    );
    modal.present();
    modal.onDidDismiss().then(()=> {
      this.getDataName();
    })
    modal.onWillDismiss().then(() => {
      this.getDataName();
    })
  }
}
