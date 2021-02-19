import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, PopoverController } from '@ionic/angular';
import { AccountService, PATTERN } from '../@app-core/http';
import { PopupComponent } from '../@modular/popup/popup.component';
import { ModalPasswordComponent } from '../@modular/modal-password/modal-password.component'
import { LoadingService, ToastService } from '../@app-core/utils';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  avatar = 'assets/img/avatar-account.svg';
  title = 'Thông tin cá nhân';
  activatedInput = false;
  loadedData = false;
  form: FormGroup;

  lastForm = {};
  isUpdating = false;

  validationMessages = {
    full_name: [
      { type: 'required', message: 'Name is required.' }
    ],
    phone_number: [
      { type: 'required', message: 'Phone number is required.' },
      { type: 'pattern', message: 'Phone number is invalid.' },
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Email is invalid.' },
    ],
    // full_address: [
    //   { type: 'required', message: 'Address is required.' }
    // ]
  }

  constructor(
    private fb: FormBuilder,
    public popoverController: PopoverController,
    private accountService: AccountService,
    private passwordModal: ModalController,
    private loadingService: LoadingService,
    private toastService: ToastService
  ) { }
  ngOnInit() {
    this.initForm();
    this.getData();
  }

  ionViewWillEnter() {
      this.avatar = localStorage.getItem('avatar');
  }

  initForm() {
    this.form = this.fb.group({
      full_name: new FormControl('', Validators.required),
      birthday: new FormControl(''),
      phone_number: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(PATTERN.PHONE_NUMBER_VIETNAM_FULL)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(PATTERN.EMAIL)
      ])),
      // full_address: new FormControl('', Validators.required),
    });
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopupComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      mode: 'md',
    });
    return await popover.present();
  }

  async openModalPassword(ev: any) {
    const popover = await this.passwordModal.create({
      component: ModalPasswordComponent,
      cssClass: 'modalPassword',
    });
    return await popover.present();
  }
  
  activateInput() {
    this.activatedInput = true;
    this.lastForm = this.form.value;
  }
  deactivateInput() {
    this.activatedInput = false;
    this.form.patchValue(this.lastForm);
  }

  getData() {
    this.accountService.getAccounts().subscribe(data => {
      data.app_user.birthday;
      this.form.patchValue(data.app_user);
      this.loadedData = true;
      this.loadingService.dismiss();
    });
  }

  updateInfo() {
    this.loadingService.present();
    let data = this.form.value;
    this.accountService.updateProfile(data).subscribe(() => {
      this.activatedInput = false;
      this.loadingService.dismiss();
      this.toastService.present('Updated successfully!');
    });
  }

  canUpdate() {
    return JSON.stringify(this.lastForm) !== JSON.stringify(this.form.value) && this.form.valid;
  }
}

