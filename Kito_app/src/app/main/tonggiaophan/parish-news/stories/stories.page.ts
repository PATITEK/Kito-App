import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar, ModalController, Platform } from '@ionic/angular';
import { ModalMenuComponent } from 'src/app/@modular/modal-menu/modal-menu.component';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.page.html',
  styleUrls: ['./stories.page.scss'],
})
export class StoriesPage implements OnInit {
  activeSeach=false;
  activeMenu=false;
  @ViewChild('search') search:IonSearchbar;
  constructor(
    public platform: Platform,
    private modalCtrl: ModalController, 
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.platform.is("android")) {
      document.querySelector<HTMLElement> ('.content-search').style.marginBottom ="10px";
      // document.querySelector<HTMLElement> ('.icon-bars').style.transform ="translateY(25%)"

    }
  }
  showSearch(){
    this.activeSeach=true;
    setTimeout(() => this.search.setFocus(), 1000);
  }
  async openModalMenu() {
    const popover = await this.modalCtrl.create({
      component: ModalMenuComponent,
      cssClass: 'modalMenu  ',
    });
    return await popover.present();
  }
  BluSearch(){
    this.activeSeach=false;
  }
  gotoDetail(){
    this.router.navigateByUrl('main/tonggiaophan/parish-news/stories/story-detail');
  }
  counter(i: number) {
    return new Array(i);
}
}
