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
  // public type = 'password';
  // public showpass = false;
  // public name = 'eye-outline';
  // public status = 'login';
  
  country_codes: any;
  segmentValue = 'login';
  matchPassword = false;
  formLogin: FormGroup;
  formSignUp: FormGroup;

  validationLoginMessages = {
    email: [
      { type: 'required', message: 'Email or phone number is required' },
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
    birthday: [
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
  default = '';
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
    // total_objects: 0,
    // search: '',
    // sort: '',
    // typeSort: 0,
  }
 
  ngOnInit() {
    // this.authService.countryCode().subscribe((data: any) => {
    //   this.country_codes = data.country_codes;
    // })
  //  this.id_diocese = this.formSignUp.get('dioceses').value;
    this.initForm();
    this.oneSignal.setUpOneSignal();
  }
  pageRequestParishes: IPageParishes = {
    diocese_id: this.id_diocese,
    page: 1,
    per_page: 100,
    // total_objects: 0,
    // search: '',
    // sort: '',
    // typeSort: 0,
  }
  onChange(tagret) {
    console.log(tagret.name)
  }
  ionViewWillEnter () {
    this.diocese.getAll(this.pageRequestDioceses).subscribe(data =>{
      this.listDioceses = data.dioceses;
      console.log(this.default = this.listDioceses[0].name)
    }),
    this.parishes.getAll(this.pageRequestParishes).subscribe(data=> {
      console.log(data);
    })

  }
  initForm() {
    this.formLogin = this.formBuilder.group({
      email: new FormControl('', Validators.required),
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
      birthday: new FormControl('', Validators.compose([
        Validators.required
      ])),
      dioceses: new FormControl('', Validators.compose([
        Validators.required
      ])),
      parishes: new FormControl('', Validators.compose([
        Validators.required
      ])),
     // country_code: new FormControl('84'),
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
  submitLogin() {
    if (!this.canSubmitLogin()) {
      this.markFormGroupTouched(this.formLogin);
    } else {
      this.authService.login(this.formLogin.value).subscribe(data => {
        this.router.navigate(['main/chabad']);
      });
    }
  }

  submitSignUp() {
    console.log(this.formSignUp.get('dioceses').value)
    if (!this.canSubmitSignUp()) {
      console.log('1')
      //  this.markFormGroupTouched(this.formSignUp);
    } else if (!this.checkMatchConfirmedPassword()) {
      console.log('2')

      this.toastService.present('Confirmed password not match');
    } else {
      console.log('3')

      let data = this.formSignUp.value;
      data.phone_number = data.phone_number.length == 10 ? data.phone_number.substring(1, 10) : data.phone_number;
      // data.phone_number = `+${this.formSignUp.value.country_code}${data.phone_number}`;
      console.log(data);
      this.authService.signup(this.formSignUp.value).subscribe((data)=>{
        console.log(data)
      });
    }
  }

  // showPass() {
  //   this.showpass = !this.showpass;
  //   if (this.showpass) {
  //     this.type = 'text';
  //     this.name = 'eye-off-outline'
  //   }
  //   else {
  //     this.type = 'password';
  //     this.name = 'eye-outline'
  //   }
  // }

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
