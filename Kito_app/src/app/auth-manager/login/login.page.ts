import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, IPageRequest, PATTERN, PASSWORD,REQUIRED, NAME, EMAIL,VALID } from 'src/app/@app-core/http';
import { ToastController } from '@ionic/angular';
import { LoadingService, OneSignalService } from 'src/app/@app-core/utils';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/@app-core/utils';
import { DioceseService } from 'src/app/@app-core/http/diocese';
import { ParishesService } from 'src/app/@app-core/http/parishes';
import { IPageParishes } from 'src/app/@app-core/http/parishes/parishes.DTO';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public type = 'password';
  public showpass = false;
  public name = 'eye-outline';
  public status = 'login';
  country_codes: any;
  segmentValue = 'login';
  matchPassword = false;
  formLogin: FormGroup;
  formSignUp: FormGroup;
  showSpinner = false;
  validationLoginMessages = {
    phone_number: [
      { type: 'required', message: REQUIRED.REQUIRED },
    ],
    password: [
      { type: 'required', message: REQUIRED.REQUIRED }
    ],
  }

  validationSignUpMessages = {
    full_name: [
      { type: 'required', message: REQUIRED.REQUIRED },
      { type: 'pattern', message: NAME.NOT_SPEC_CHAR },
    ],
    email: [
      { type: 'required', message: REQUIRED.REQUIRED },
      { type: 'pattern', message: EMAIL.NOT_VALID },
    ],
    phone_number: [
      { type: 'required', message: REQUIRED.REQUIRED },
      { type: 'pattern', message: VALID.NOT_VALID },
    ],
    age: [
      { type: 'required', message: REQUIRED.REQUIRED}
    ],
    country_code: [
      { type: 'required', message: REQUIRED.REQUIRED },
    ],
    province: [
      { type: 'required', message: REQUIRED.REQUIRED },
    ],
    district: [
      { type: 'required', message: REQUIRED.REQUIRED },
    ],
    full_address: [
      { type: 'required', message: REQUIRED.REQUIRED },
    ],
    password: [
      { type: 'required', message: REQUIRED.REQUIRED },
      { type: 'minLength', message: PASSWORD.MIN_LENGTH },
    ],
  }

  countries: any;
  listDioceses: any;
  listParishes: any;
  id_diocese = 1;
  tagret;
  code;
  constructor(
    private router: Router,
    private authService: AuthService,
    public toastController: ToastController,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private diocese: DioceseService,
    private oneSignal: OneSignalService,
    private parishes: ParishesService
  ) { }
  pageRequestDioceses: IPageRequest = {
    page: 1,
    per_page: 100,
  }
  pageRequestParishes: IPageParishes = {
    diocese_id: this.id_diocese,
    page: 1,
    per_page: 100,
  }

  ngOnInit() {
    this.authService.countryCode().subscribe((data: any) => {
      this.country_codes = data.country_codes;
      this.code = data.country_codes[0].phone_code;
    })

    this.diocese.getAll(this.pageRequestDioceses).subscribe(data => {
      this.listDioceses = data.dioceses;
      this.tagret = this.listDioceses[0].name
    }),
      this.parishes.getAllWithDioceseId(this.pageRequestParishes).subscribe(data => {
        this.listParishes = data.parishes;
      })

    this.initForm();
    // this.oneSignal.startOneSignal();
    // this.oneSignal.setUpOneSignal();
  }
  onSelectChange(event) {
    this.pageRequestParishes.diocese_id = this.formSignUp.get('dioceses').value;
    this.parishes.getAllWithDioceseId(this.pageRequestParishes).subscribe(data => {
      this.listParishes = data.parishes;
    })
  }
  initForm() {
    this.formLogin = this.formBuilder.group({
      phone_number: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
    this.formSignUp = this.formBuilder.group({
      full_name: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      sex: new FormControl('male'),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(PATTERN.EMAIL)
      ])),
      phone_number: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(PATTERN.PHONE_NUMBER_VIETNAM)
      ])),
      age: new FormControl('', Validators.compose([
        Validators.required
      ])),
      dioceses: new FormControl('', Validators.compose([
        Validators.required
      ])),
      parish_id: new FormControl('', Validators.compose([
        Validators.required
      ])),
      country_code: new FormControl(''),
      full_address: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      confirmed_password: new FormControl('')
    })
  }
  changedSegment(event) {
    this.segmentValue = event.target.value;
  }
  canSubmitLogin() {
    return this.formLogin.valid;
  }

  canSubmitSignUp() {
    return this.formSignUp.valid;
  }
  async submitLogin() {
    this.showSpinner = true;
    if (!this.canSubmitLogin()) {
      this.showSpinner = false;
      this.markFormGroupTouched(this.formLogin);
    } else {
      let dataFormLogin = this.formLogin.value;
      dataFormLogin.phone_number = dataFormLogin.phone_number.length == 10 ? dataFormLogin.phone_number.substring(1, 10) : dataFormLogin.phone_number;
      dataFormLogin.phone_number = `+84${dataFormLogin.phone_number}`;
      let dataSubmit = {
        "phone_number": dataFormLogin.phone_number,
        "password": dataFormLogin.password
      }
      this.authService.login(dataSubmit).subscribe(
        () => {
          this.showSpinner = false;
          this.router.navigate(['main/chabad']);
        },
        (error: any) => {
          this.showSpinner = false;
          throw error
        }
      );
    }
  }

  submitSignUp() {
    this.showSpinner = true;
    if (!this.canSubmitSignUp()) {
      this.showSpinner = false;
      this.markFormGroupTouched(this.formSignUp);
    } else if (!this.checkMatchConfirmedPassword()) {
      this.showSpinner = false;
      this.toastService.presentFail(PASSWORD.NOT_MATCH);
    } else {
      let data = this.formSignUp.value;
      data.phone_number = '+84' + data.phone_number;
      let submitData = {
        "full_name": data.full_name,
        "sex": data.sex,
        "birthday": data.age,
        "full_address": data.full_address,
        "phone_number": data.phone_number,
        "email": data.email,
        "password": data.password,
        "password_confirmation": data.confirmed_password,
        "parish_id": data.parish_id
      }
      this.authService.signup(submitData).subscribe(
        (data) => {
          // console.log(data)
        },
        (error: any) => {
          this.showSpinner = false;
          throw error;
        }
      );
    }
  }

  showPass() {
    this.showpass = !this.showpass;
    if (this.showpass) {
      this.type = 'text';
      this.name = 'eye-off-outline'
    }
    else {
      this.type = 'password';
      this.name = 'eye-outline'
    }
  }
  clickForgotPassword() {
    this.router.navigate(['auth-manager/forgot-password']);
  }
  checkMatchConfirmedPassword() {
    return this.formSignUp.get('password').value == this.formSignUp.get('confirmed_password').value;
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
