import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { AuthService, PATTERN } from 'src/app/@app-core/http';
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
    if (PATTERN.EMAIL.test(this.email.email)) {
      this.loadingService.present();
      this.authService.forgotPassword({email: this.email.email}).subscribe((data) => {
        this.toastService.present('Complete! Check the OTP code in your email', 'top');
        this.loadingService.dismiss();
        this.router.navigateByUrl('auth-manager/verification');
      })
    } else {
      if(this.email.email == '') {
        this.toastService.present('Please type your phone number!', 'top', 2000);
      }
      else {
        this.toastService.present('Phone number is invalid!', 'top', 2000);
      }
    }
  }

  getEmail(event) {
    this.email.email = event.target.value;
  }
}
