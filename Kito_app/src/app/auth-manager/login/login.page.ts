import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, IPageRequest, PATTERN } from 'src/app/@app-core/http';
import { ToastController } from '@ionic/angular';
import { defaultCoreCipherList } from 'constants';
import { LoadingService, OneSignalService } from 'src/app/@app-core/utils';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    { type: 'required', message: 'phone number is required' },
    ],
    password: [
      { type: 'required', message: 'Password is required' }
    ],
  }

  validationSignUpMessages = {
    full_name: [
      { type: 'required', message: 'Name is required' },
      { type: 'pattern', message: "Name can't not contain special letters" },
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Email is invalid' },
    ],
    phone_number: [
      { type: 'required', message: 'Phone number is required' },
      { type: 'pattern', message: 'Phone number is invalid' },
    ],
    age: [
      { type: 'required', message: 'Age is required' }
    ],
    country_code: [
      { type: 'required', message: 'Country is required' },
    ],
    province: [
      { type: 'required', message: 'Province is required' },
    ],
    district: [
      { type: 'required', message: 'District is required' },
    ],
    full_address: [
      { type: 'required', message: 'Address is required' },
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minLength', message: 'Password must be at least 6 letters' },
    ],
  }

  countries:any;
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
    private loadingService: LoadingService,
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

    this.diocese.getAll(this.pageRequestDioceses).subscribe(data =>{
      this.listDioceses = data.dioceses;
      this.tagret = this.listDioceses[0].name
    }),
    this.parishes.getAll(this.pageRequestParishes).subscribe(data=> {
      this.listParishes = data.parishes;
    })
   
    this.initForm();
    // this.oneSignal.startOneSignal();
    // this.oneSignal.setUpOneSignal();
  }
  onSelectChange() {
     this.pageRequestParishes.diocese_id = this.formSignUp.get('dioceses').value;
     console.log(this.pageRequestParishes);
     this.parishes.getAll(this.pageRequestParishes).subscribe(data=> {
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
        // Validators.pattern(PATTERN.NAME)
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
     // province: new FormControl('Ho Chi Minh'),
     // district: new FormControl('Thu Duc'),
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
     dataFormLogin.phone_number =  dataFormLogin.phone_number.length == 10 ? dataFormLogin.phone_number.substring(1, 10) : dataFormLogin.phone_number;
     dataFormLogin.phone_number = `+84${dataFormLogin.phone_number}`;
     
     let dataSubmit = {
      "phone_number":  dataFormLogin.phone_number,
      "password": dataFormLogin.password
    }
      this.authService.login(dataSubmit).subscribe(
      (data: any) => {
        this.router.navigate(['main/chabad']);
        },
        (data: any)=> {
            this.showSpinner = false;
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
      this.toastService.present('Confirmed password not match');
    } else {
      let data = this.formSignUp.value;
      data.phone_number = data.phone_number.length == 10 ? data.phone_number.substring(1, 10) : data.phone_number;
      data.phone_number = `+${this.formSignUp.value.country_code}${data.phone_number}`;
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
        (data)=>{
        },
        (data:any) =>{
          this.showSpinner = false;
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

  // async presentToast(message) {
  //   const toast = await this.toastController.create({
  //     message: message,
  //     duration: 1500
  //   });
  //   toast.present();
  // }
  // showSelectValue = function (mySelect) {
  //   console.log(mySelect);
  // }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
