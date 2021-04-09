import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, ORTHER } from 'src/app/@app-core/http';
import { LoadingService, ToastService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  email: any = {
    email : ''
  }
  constructor(
    private router: Router,
    private toastService: ToastService,
    private authService: AuthService,
    private loadingService: LoadingService
  ) { }
  ngOnInit() {
  }
  goToVerification() {
      this.loadingService.present();
      this.authService.forgotPassword({email: this.email.email}).subscribe((data) => {
        this.loadingService.dismiss();
        this.toastService.presentSuccess(ORTHER.CHECK);
        this.router.navigateByUrl('auth-manager/verification');
      })
  }
  getEmail(event) {
    this.email.email = event.target.value;
  }
}
