import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IPageRequest } from '../@app-core/http';
import { DioceseService } from '../@app-core/http/diocese';
import { ModalDonateComponent } from '../@modular/modal-donate/modal-donate.component';

@Component({
  selector: 'app-dioceses',
  templateUrl: './dioceses.page.html',
  styleUrls: ['./dioceses.page.scss'],
})
export class DiocesesPage implements OnInit {

  title = 'Chọn Giáo Phận';
  data:any = [];
  pageResult:IPageRequest={
    page: 1,
    per_page: 5,
  }
  

  constructor(
    private modalCtrl: ModalController,
    private diocesesService:DioceseService
    ) { }

  ngOnInit() { 
    this.getAll();
  }
  async goToDetail() {
    const popover = await this.modalCtrl.create({
      component: ModalDonateComponent,
      cssClass: 'modalDonate  ',
    });
    return await popover.present();
  }
  getAll(){
    this.diocesesService.getAll(this.pageResult).subscribe((data: any) => {
      

      this.data=data.dioceses;
      
      
      this.pageResult.total_objects = data.meta.pagination.total_objects || 1;
    });
  }
}
