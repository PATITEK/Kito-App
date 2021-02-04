import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { ModalMenuComponent } from 'src/app/@modular/modal-menu/modal-menu.component';
@Component({
  selector: 'app-tonggiaophan',
  templateUrl: './tonggiaophan.page.html',
  styleUrls: ['./tonggiaophan.page.scss'],
})
export class TonggiaophanPage implements OnInit {
activeSeach=false;
activeMenu=false;
  constructor(
    public platform: Platform,
    private modalCtrl: ModalController, 
    private router: Router,
    ) { 
    
  }

  ngOnInit() {
    if (this.platform.is("android")) {
      document.querySelector<HTMLElement> ('.content-search').style.marginBottom ="10px";
      document.querySelector<HTMLElement> ('.list-item').style.marginTop ="20px";
      document.querySelector<HTMLElement> ('.icon-bars').style.transform ="translateY(25%)"

    }
     
  }
  showSearch(){
    this.activeSeach=true;
  }
  async openModalMenu() {
    const popover = await this.modalCtrl.create({
      component: ModalMenuComponent,
      cssClass: 'modalMenu  ',
    });
    return await popover.present();
  }
  checkoutVatican(){
    this.router.navigateByUrl('main/parish-news');
    
  }
}
