import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { AccountService, PATTERN } from '../@app-core/http';
import { PopupComponent } from '../@modular/popup/popup.component';
import { CameraService, ImageService, LoadingService, ToastService } from '../@app-core/utils';
import { ChangepasswordPage } from '../changepassword/changepassword.page';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  image_avatar: any;
  avatar = '';
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
    private toastService: ToastService,
    public imageService: ImageService,
    private alertCtrl: AlertController,
    private cameraService: CameraService
  ) { }
  ngOnInit() {
    this.initForm();
    this.getData();
   
  }
  ngDoCheck(){
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
  //  this.imageService.getImage();
   this.accountService.getAccounts().subscribe(data => {
    if(data.app_user.thumb_image == null) {
      data.app_user['thumb_image'] = "https://i.imgur.com/edwXSJa.png";
      this.avatar = data.app_user.thumb_image;
    }
    else if( data.app_user.thumb_image.url == null) {
      data.app_user['thumb_image'] = "https://i.imgur.com/edwXSJa.png";
      this.avatar = data.app_user.thumb_image;
    }
    else {
      this.avatar =  data.app_user.thumb_image.url;
    }
})
}

  initForm() {
    this.form = this.fb.group({
      avatar:  new FormControl(''),
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

  // async presentPopover(ev: any) {
  //   const popover = await this.popoverController.create({
  //     component: PopupComponent,
  //     cssClass: 'my-custom-class',
  //     event: ev,
  //     translucent: true,
  //     mode: 'md',
  //   });
  //   return await popover.present();
  // }

  async avatarSetting() {
    let alertAvatarSetting =  await this.alertCtrl.create({
      message: 'Cài đặt ảnh đại diện',
      mode: 'ios',
      buttons: [
        {
          text: 'Xem ảnh đại diện',
          handler: () => {
            this.cameraService.viewAvatar();
          }
        },
        {
          text: 'Tải ảnh lên',
          handler: () => {
            
            this.cameraService.getAvatarUpload(this.image_avatar);
            // this.avatar=localStorage.getItem('avatar_tam');
            // console.log(this.avatar);
            
          }
        },
        {
          text: 'Chụp ảnh mới',
          handler: () => {
            this.cameraService.getAvatarTake(this.image_avatar);
          }
        },
        {
          text: 'Xóa ảnh đại diện',
          handler: () => {
            this.cameraService.removeAvatar();
          }
        },
        {
          text: 'Hủy',
          role: 'destructive',
        },
      ]
    });
    await alertAvatarSetting.present();

  }

  async openModalPassword(ev: any) {
    const popover = await this.passwordModal.create({
      component: ChangepasswordPage,
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
    this.accountService.updateProfile(data).subscribe((data) => {
      localStorage.setItem('fullname', data.app_user.full_name);
      this.activatedInput = false;
      this.loadingService.dismiss();
      this.toastService.present('Cập nhật thành công !');
    });
  }

  canUpdate() {
    return JSON.stringify(this.lastForm) !== JSON.stringify(this.form.value) && this.form.valid;
  }
}

