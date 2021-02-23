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
  title = 'Chọn giáo phận';
  data: any = [];
  canDiocese = true;
  id;
  type;
  pageResult:IPageRequest = {
    page: 1,
    per_page: 5,
  }
  pageParish: IPageParishes = {
    diocese_id: 1,
    page: 1,
    per_page: 100
  }
  constructor(
    private modalCtrl: ModalController,
    private diocesesService: DioceseService,
    private route: ActivatedRoute,
    private parishesService: ParishesService,
    private authService: AuthService,
    private loadingService: LoadingService
    ) { }
    ngOnInit() { 
    this.loadingService.present();
     this.authService.receiveData.subscribe(data => {
       this.type = data.type;
     })
      this.getAll();
    }
  getAll(){
      this.diocesesService.getAll(this.pageResult).subscribe((data: any) => {
        this.loadingService.dismiss()
        this.data = data.dioceses;
        this.pageResult.total_objects = data.meta.pagination.total_objects || 1;
      });
    }
}
