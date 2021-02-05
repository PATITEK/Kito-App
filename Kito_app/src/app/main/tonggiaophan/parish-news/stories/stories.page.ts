import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalMenuComponent } from 'src/app/@modular/modal-menu/modal-menu.component';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.page.html',
  styleUrls: ['./stories.page.scss'],
})
export class StoriesPage implements OnInit {
  title = 'Tiểu sử'

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }
  
  goToStoryDetail() {
    const data = {
      // id: item.id,
      type: 'Story'
    }
    this.router.navigate(['/news-detail'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }

  counter(i: number) {
    return new Array(i);
}
}
