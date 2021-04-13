import { LoadingService } from './utils/loading.service';
import { ErrorHandler, Injectable, Injector, Inject } from '@angular/core';
import { ToastService } from './utils';
import { TOARST } from './http/@http-config/messages'
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(
        @Inject(Injector) private readonly injector: Injector,
        private loadingService: LoadingService,
        private toarstSerivce: ToastService
    ) { }
    handleError(error) {
        console.log(error.message)
        this.loadingService.dismiss();
        if(error.message === 'Uncaught (in promise): overlay does not exist') {
            return
        }
        else this.toarstSerivce.presentSuccess(error.message);
    }
}
