import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SpeechRecognitionService } from 'src/app/@app-core/utils';
import { ModalMenuComponent } from '../modal-menu/modal-menu.component';

@Component({
  selector: 'app-search-bar-nav',
  templateUrl: './search-bar-nav.component.html',
  styleUrls: ['./search-bar-nav.component.scss'],
})
export class SearchBarNavComponent implements OnInit {
  @ViewChild('searchBar') searchBar: any;
  @Output() output = new EventEmitter<string>();
  hiddenSearchBar = true;

  constructor(
    private modalCtrl: ModalController,
    private SpeechRecognitionService: SpeechRecognitionService,
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

  startVoice() {
    this.SpeechRecognitionService.checkPermission();
  }

  changeInput(value) {
    this.output.emit(value);
  }
}
