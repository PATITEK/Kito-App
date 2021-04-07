import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx'

@Component({
  selector: 'app-search-bar-nav',
  templateUrl: './search-bar-nav.component.html',
  styleUrls: ['./search-bar-nav.component.scss'],
})
export class SearchBarNavComponent implements OnInit {
  @ViewChild('searchBar') searchBar: any;
  @Output() output = new EventEmitter<string>();
  input = '';
  hiddenSearchBar = true;
  constructor(
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
  startVoice() {
    this.PlatForm.ready().then(() => {
      this.speechRecognition.requestPermission().then(
        async  () => {
          await this.startVoiceRecord();
          this.searchBar.setFocus();
        }
      )
    })
    return;
  }
  startVoiceRecord() {
    this.speechRecognition.startListening().subscribe((matches: Array<string>) => {
      this.input= matches[0];
    })
  }
  changeInput(value) {
    this.output.emit(value);
  }
}
