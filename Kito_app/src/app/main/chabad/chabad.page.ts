import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { IPageRequest, ChabadService } from 'src/app/@app-core/http';

@Component({
  selector: 'app-chabad',
  templateUrl: './chabad.page.html',
  styleUrls: ['./chabad.page.scss'],
})
export class ChabadPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  chabads = [];
  pageRequest: IPageRequest = {
    page: 1,
    per_page: 3
  }

  constructor(
    private router: Router,
    private chabadService: ChabadService,
  ) { }

  ngOnInit() {
    console.log("chabab");
    
    this.getData();
  }

  getData(func?) {
    this.chabadService.getAll(this.pageRequest).subscribe(data => {
      this.chabads = this.chabads.concat(data.chabads);
      func && func();
      this.pageRequest.page++;

      if (this.chabads.length >= data.meta.pagination.total_objects && this.infiniteScroll) {
        this.infiniteScroll.disabled = true;
      }
    })
  }

  goToChabadDetail(chabad) {
    const data = {
      id: chabad.id
    }
    this.router.navigate(['chabad'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }

  goToMap() {
    event.stopPropagation();
  }

  doRefresh(event) {
    // reset
    this.chabads = [];
    this.pageRequest.page = 1;
    if (this.infiniteScroll) {
      this.infiniteScroll.disabled = false;
    }

    this.getData(() => {
      event.target.complete();
    });
  }

  getChabadImageString(chabad) {
    return `url(${chabad.thumb_image})`;
  }

  loadMoreData(event) {
    this.getData(() => {
      event.target.complete();
    });
  }
}
