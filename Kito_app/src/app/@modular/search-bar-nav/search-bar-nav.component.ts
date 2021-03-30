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
  input: any;
  constructor(
    private modalCtrl: ModalController,
    private SpeechRecognitionService: SpeechRecognitionService,
  ) { }

  ngOnInit() {
    // console.log(this.input);
   }

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
  ngDoCheck() {
    // console.log(this.input);
  }
  startVoice() {
    this.SpeechRecognitionService.checkPermission();
  }

  changeInput(value) {
    this.output.emit(value);
  }
}
