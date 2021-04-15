import { Router } from '@angular/router';
import { LoadingService } from './utils/loading.service';
import { ErrorHandler, Injectable, Injector, Inject } from '@angular/core';
import { ToastService } from './utils';
import { stringify } from '@angular/compiler/src/util';
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(
        @Inject(Injector) private readonly injector: Injector,
        private loadingService: LoadingService,
        private toarstSerivce: ToastService,
        private router: Router
    ) { }
    handleError(error) {
        const err = error.message;
        console.log(error.message)
        this.loadingService.dismiss();
        if(error.message === 'Uncaught (in promise): overlay does not exist') {
            return
        }
        else if (error.message === 'Signature has expired' ||error.message === 'Signature verification raised') {
            this.router.navigate(['/auth-manager/login'])
        }
        else this.toarstSerivce.presentFail(error.message);
    }
}
