import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AuthService } from '../http';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
@Injectable()
export class SpeechRecognitionService {
    constructor(
        public PlatForm: Platform,
        public authService: AuthService,
        public socialSharing: SocialSharing
    ) { }
}