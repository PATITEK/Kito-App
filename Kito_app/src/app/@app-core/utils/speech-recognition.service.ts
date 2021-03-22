import { Injectable } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { Platform } from '@ionic/angular';
import { ToastService } from './toast.service';

@Injectable()
export class SpeechRecognitionService {

    public voiceResult = '';

    constructor(
        public speechRecognition: SpeechRecognition,
        public PlatForm: Platform,
        public toastService: ToastService
      ) { }

    checkPermission() {
        this.PlatForm.ready().then(() => {
            // this.speechRecognition.hasPermission().then((hadPermission: boolean) => {
            //     if(hadPermission) {
                    
            //     }
            // });
            this.speechRecognition.requestPermission().then(
                () => {
                    this.startVoiceRecord();
                },
                () => console.error('Denied, only working on devices')
            )
        })
    }

    startVoiceRecord() {
        this.speechRecognition.startListening().subscribe((matches: Array<string>) => {
          this.voiceResult = matches[0];
          this.toastService.present('Tìm kiếm: '+this.voiceResult, 'top')
        })
    }
}