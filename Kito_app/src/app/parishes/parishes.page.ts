import { Component, OnInit } from '@angular/core';
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
  headerCustom = {};

  constructor(
    public parishesService: ParishesService,
    public authService: AuthService,
    private loadingService: LoadingService
  ) { }
  id = 0;
  pageParish: IPageParishes = {
    diocese_id: 1,
    page: 1,
    per_page: 100
  }
  data;
  type: {
    type: any
  };
  ngOnInit() {
    this.loadingService.present()
    this.authService.receiveData.subscribe(data => {
      this.pageParish.diocese_id = data.id;
      this.type = data.type
    })
    this.parishesService.getAllWithDioceseId(this.pageParish).subscribe((data: any) => {
      this.loadingService.dismiss()
      this.data = data.parishes;
    });
  }
}
