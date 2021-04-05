import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx'

@Component({
  selector: 'app-search-bar-nav',
  templateUrl: './search-bar-nav.component.html',
  styleUrls: ['./search-bar-nav.component.scss'],
})
export class SearchBarNavComponent implements OnInit, OnChanges {
  @ViewChild('searchBar') searchBar: any;
  @Output() output = new EventEmitter<string>();
  input = '';
  hiddenSearchBar = true;
  constructor(
    private modalCtrl: ModalController,
    public PlatForm: Platform,
    private speechRecognition: SpeechRecognition
  ) {
  }
  
  ngOnInit() {
    
  }
  ngOnChanges(){

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
        },
        () => console.error('Denied, only working on devices')
      )
    })
    return;
  }
  
  ngAfterContentChecked() {
  //  console.log(this.input);
   
  }
  startVoiceRecord() {
    this.speechRecognition.startListening().subscribe((matches: Array<string>) => {
      // console.log(matches[0]);
      
      this.input= matches[0];
    })
    
  }

  changeInput(value) {
    this.output.emit(value);
  }
  // getValue(value) {
  //   value = this.input;
  // }
}
