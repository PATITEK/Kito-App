import { NetworkService } from './utils/network.service';
import { Router } from '@angular/router';
import { LoadingService } from './utils/loading.service';
import { ErrorHandler, Injectable, Injector, Inject } from '@angular/core';
import { ToastService } from './utils';
import { AlertController } from '@ionic/angular';
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(
        @Inject(Injector) private readonly injector: Injector,
        private loadingService: LoadingService,
        private toarstSerivce: ToastService,
        private router: Router,
        private alertController: AlertController,
        private netWorkService: NetworkService
    ) { }
    handleError(error) {
        this.netWorkService.setSubscriptions();
        if (error.message) console.error(error.message);
        this.loadingService.dismiss();
        if (error.message === 'Uncaught (in promise): overlay does not exist') {
            return
        }
        else if (error.message === 'Signature has expired' || error.message === 'Signature verification raised') {
            this.validateConfirm();
        }
        else {
            if(error.message != null) {
                this.toarstSerivce.presentFail(error.message);
            }
        }
    }

    async validateConfirm() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Phiên đã hết hạn, vui lòng đăng nhập lại',
            backdropDismiss: false,
            buttons: [
                {
                    text: 'Đồng ý',
                    handler: () => {
                        this.router.navigate(['/auth-manager/login']);
                        localStorage.clear();
                    }
                }
            ]
        });

        await alert.present();
    }
}
