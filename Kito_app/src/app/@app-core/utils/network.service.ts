import { ToastService } from 'src/app/@app-core/utils';
import { Injectable } from "@angular/core";
import { Network } from "@ionic-native/network";
import { Platform } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class NetworkService {
    public connected: BehaviorSubject<boolean> = new BehaviorSubject(true);
    private subscribedToNetworkStatus: boolean = false;
    private network = Network;
    constructor(private toastService: ToastService, private platform: Platform) {
    }
    isConnected: any;
    public setSubscriptions() {
        if (!this.subscribedToNetworkStatus && this.platform.is("cordova")) {
            this.subscribedToNetworkStatus = true;

            if ("none" === this.network.type) {
                this.showAlert();
            }
            this.network.onChange().subscribe((val) => {
                this.isConnected = val.toString();
                console.log(this.isConnected);
                this.showAlert();
              });
            this.network.onDisconnect().subscribe(() => {
                this.connected.next(false);
            });
        }
    }

    private showAlert() {
        if(this.isConnected == 'disconnected') {
            this.toastService.presentFail('Vui lòng kiểm tra lại kết nối mạng!');
        }
        else if (this.isConnected == 'connected') {
            this.toastService.presentFail('Đã kết nối!');
        }
    }
}