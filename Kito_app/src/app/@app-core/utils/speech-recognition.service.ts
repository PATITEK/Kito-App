import { Injectable } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx'

@Injectable()
export class SpeechRecognitionService {

    constructor(
        public speechRecognition: SpeechRecognition,
      ) { }

    checkPermission() {
        this.speechRecognition.hasPermission().then((hadPermission: boolean) => {
        if(hadPermission) {
            this.speechRecognition.requestPermission().then(
            () => console.log('Granted'),
            () => console.log('Denied')
            )
        }
        });
    }

    startVoiceRecord() {
        let result = '';
        this.speechRecognition.startListening().subscribe((matches: Array<string>) => {
          result = matches[0];
          console.log(result);
        })
    }
}