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
        this.loadingService.dismiss();
        // console.log(error);
        this.toarstSerivce.presentFail(error.message, TOARST.POSITION.top, TOARST.COLOR.dark);
    }
}
