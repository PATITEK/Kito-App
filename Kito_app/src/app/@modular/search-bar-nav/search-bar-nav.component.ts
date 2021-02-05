import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalMenuComponent } from '../modal-menu/modal-menu.component';

@Component({
  selector: 'app-search-bar-nav',
  templateUrl: './search-bar-nav.component.html',
  styleUrls: ['./search-bar-nav.component.scss'],
})
export class SearchBarNavComponent implements OnInit {
  @ViewChild('searchBar') searchBar: any;

  hiddenSearchBar = true;

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() { }

  toggleHideSearchBar(value) {
    this.hiddenSearchBar = value;
    if (!value) {
      this.searchBar.setFocus();
    }
  }

  async openModalMenu() {
    const popover = await this.modalCtrl.create({
      component: ModalMenuComponent,
      cssClass: 'modalMenu',
    });
    return await popover.present();
  }
}
