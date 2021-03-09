import { Component, OnInit } from '@angular/core';
import { SpeechRecognitionService } from 'src/app/@app-core/utils';
@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {

  constructor(
    private SpeechRecognitionService: SpeechRecognitionService,

  ) { }
  headerCustom = { title: 'Trợ Giúp' };
  ngOnInit() {
  }
  startVoice() {
    this.SpeechRecognitionService.checkPermission();
  }
}
