import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { AlertService } from './alert.service';

@Injectable()
export class OneSignalService {
    constructor(
        public oneSignal: OneSignal,
        public alert: AlertService,
        public PlatForm: Platform,
    ) { }
    
    startOneSignal() {
        this.PlatForm.ready().then(() => {
            this.oneSignal.startInit("17a2acbf-854f-4011-97b8-43f2640b7312", "292455090753"); //key and sender id from google firebase app account, can change later
            this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);

            this.oneSignal.handleNotificationReceived().subscribe(data => {
                let message = data.payload.body;
                let header = data.payload.title;
                this.alert.present(header, message);
            });
            this.oneSignal.handleNotificationOpened().subscribe(data => {
                let message = data.notification.payload.body;
                let header = data.notification.payload.title;
                this.alert.present(header, message);

            });
            this.oneSignal.endInit();
        })
    }
    
}