import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService, IPageRequest } from '../@app-core/http';
import { DioceseService } from '../@app-core/http/diocese';
import { ParishesService } from '../@app-core/http/parishes';
import { IPageParishes } from '../@app-core/http/parishes/parishes.DTO';
import { LoadingService } from '../@app-core/utils';
import { ModalDonateComponent } from '../@modular/modal-donate/modal-donate.component';

@Component({
  selector: 'app-dioceses',
  templateUrl: './dioceses.page.html',
  styleUrls: ['./dioceses.page.scss'],
})
export class DiocesesPage implements OnInit {
  headerCustom =  {title: 'Chọn giáo phận'};
  dataDiocese: any = [];
  canDiocese = true;
  id;
  type_page;
  pageResult:IPageRequest = {
    page: 1,
    per_page: 100,
  }
  data;
  constructor(
    private modalCtrl: ModalController,
    private diocesesService: DioceseService,
    private route: ActivatedRoute,
    private loadingService: LoadingService
    ) { }
    ngOnInit() { 
    this.loadingService.present();
    let url = window.location.href;
    if (url.includes('?')) {
      this.route.queryParams.subscribe(params => {
        this.data = JSON.parse(params['data']);
        this.type_page = this.data.type_page;
      });
    }
    this.getAll();
  }
  getAll(){
      this.diocesesService.getAll(this.pageResult).subscribe((data: any) => {
        this.loadingService.dismiss()
        this.dataDiocese = data.dioceses;
        this.pageResult.total_objects = data.meta.pagination.total_objects || 1;
      });
    }
}
