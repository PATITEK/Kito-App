import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../@app-core/http';
import { ParishesService } from '../@app-core/http/parishes';
import { IPageParishes } from '../@app-core/http/parishes/parishes.DTO';
import { LoadingService } from '../@app-core/utils';

@Component({
  selector: 'app-parishes',
  templateUrl: './parishes.page.html',
  styleUrls: ['./parishes.page.scss'],
})
export class ParishesPage implements OnInit {
  headerCustom = {title: 'Chọn giáo xứ'};

  constructor(
    public parishesService: ParishesService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) { }
  id = 0;
  pageParish: IPageParishes = {
    diocese_id: 1,
    page: 1,
    per_page: 100
  }
  data;
  dataParish;
  type_page ='pray'
  ngOnInit() {
    this.loadingService.present();
    this.route.queryParams.subscribe(params => {
      this.data = JSON.parse(params['data']);
      this.type_page = this.data.type_page;
    });
    this.parishesService.getAll(this.pageParish).subscribe((data: any) => {
      this.loadingService.dismiss()
      this.dataParish = data.parishes;
    });
  }
}
