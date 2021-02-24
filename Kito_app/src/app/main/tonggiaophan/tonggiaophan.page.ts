import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DioceseService } from 'src/app/@app-core/http/diocese';
import { IPageRequest } from 'src/app/@app-core/http/global/global.DTO';
import { LoadingService } from 'src/app/@app-core/utils';
import { ModalDonateComponent } from 'src/app/@modular/modal-donate/modal-donate.component';

@Component({
  selector: 'app-tonggiaophan',
  templateUrl: './tonggiaophan.page.html',
  styleUrls: ['./tonggiaophan.page.scss'],
})
export class TonggiaophanPage implements OnInit {

  IPageDioceses: IPageRequest = {
  }

  headerCustom = {title: '(Tổng) Giáo phận'};
  listDioceses: any = [];

  constructor(
    private modalCtrl: ModalController,
    private diocesesService: DioceseService,
    private loadingService: LoadingService,
    ) { }

  ngOnInit() {
    this.loadingService.present();
    this.diocesesService.getAll(this.IPageDioceses).subscribe(data => {
      this.listDioceses = data.dioceses;
      this.loadingService.dismiss();
    })
  }
}
