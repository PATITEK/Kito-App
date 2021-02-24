import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DioceseService } from 'src/app/@app-core/http/diocese';
import { IPageRequest } from 'src/app/@app-core/http/global/global.DTO';
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
    ) { }

  ngOnInit() {
    this.diocesesService.getAll(this.IPageDioceses).subscribe(data => {
      this.listDioceses = data.dioceses;
    })
  }
}
