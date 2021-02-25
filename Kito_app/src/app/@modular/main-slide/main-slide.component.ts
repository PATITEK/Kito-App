import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-slide',
  templateUrl: './main-slide.component.html',
  styleUrls: ['./main-slide.component.scss'],
})
export class MainSlideComponent implements OnInit {
  @Input() data: any;
  
  slideOptions = {
    initialSlide: 0,
    loop: true,
    autoplay: {
      disableOnInteraction: false
    }
  };

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  seeMore() {
    const data = {
      type: this.data.type
    }
    this.router.navigate(['/news'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }

  goToItemDetail(item) {
    const data = {
      id: item.id,
      type: item.type
    }
    this.router.navigate(['/news-detail'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }
}
