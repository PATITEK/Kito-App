import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { Platform } from '@ionic/angular';
import { AuthService } from '../http';
import { ToastService } from './toast.service';

@Injectable()
export class SpeechRecognitionService {

    public voiceResult = '';

    constructor(
        public speechRecognition: SpeechRecognition,
        public PlatForm: Platform,
        public toastService: ToastService,
        public authService: AuthService,
        private router: Router
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
        if(localStorage.getItem('voice')) {
            localStorage.removeItem('voice')
        }
        this.speechRecognition.startListening().subscribe((matches: Array<string>) => {
          this.voiceResult = matches[0];
          this.authService.sendData(this.voiceResult)
            localStorage.setItem('voice', this.voiceResult);
            console.log(localStorage.getItem('voice'));
        })
    }
}