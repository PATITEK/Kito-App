import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { ModalMenuComponent } from '../modal-menu/modal-menu.component';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx'

@Component({
  selector: 'app-search-bar-nav',
  templateUrl: './search-bar-nav.component.html',
  styleUrls: ['./search-bar-nav.component.scss'],
})
export class SearchBarNavComponent implements OnInit, OnChanges {
  @ViewChild('searchBar') searchBar: any;
  @Output() output = new EventEmitter<string>();
  input = 'kkkk';
  hiddenSearchBar = true;
  constructor(
    private modalCtrl: ModalController,
    public PlatForm: Platform,
    private speechRecognition: SpeechRecognition
  ) {
  }
  ngOnInit() {
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
  startVoice() {
    this.PlatForm.ready().then(() => {
      this.speechRecognition.requestPermission().then(
        () => {
          this.startVoiceRecord();
        },
        () => console.error('Denied, only working on devices')
      )
    })
  }
  ngDoCheck(){
    console.log(this.input)
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }
  startVoiceRecord() {
    this.speechRecognition.startListening().subscribe((matches: Array<string>) => {
      this.input =  matches[0];
    })
  }

  changeInput(value) {
    this.output.emit(value);
  }
  // getValue(value) {
  //   value = this.input;
  // }
}
