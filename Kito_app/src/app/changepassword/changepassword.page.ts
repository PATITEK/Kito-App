import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/@app-core/http';
import { LoadingService, ToastService } from 'src/app/@app-core/utils';
import { ModalService } from '../@app-core/utils/modal.service';
import { IDataNoti, PageNotiService } from '../@modular/page-noti/page-noti.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  formSubmit: FormGroup;
  check = false;
  message = '';
  checkpn = false;
  messagepn = '';
  count: any;
  constructor(private formBuilder: FormBuilder,
    private pageNotiService: PageNotiService,
    private router: Router,
    private loadService: LoadingService,
    private modal: ModalService,
    private authService: AuthService) {
    this.formSubmit = this.formBuilder.group({
      passwordcurrent: new FormControl('', Validators.required),
      passwordnew: new FormControl('', Validators.required),
      passwordconfirm: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
  }
  onSubmit() {
    const cp = this.formSubmit.value.passwordcurrent;
    const pn = this.formSubmit.value.passwordnew;
    const pc = this.formSubmit.value.passwordconfirm;
    if (pn.length < 6) {
      this.checkpn = true;
      this.messagepn = 'Mật khẩu ít nhất 6 kí tự.'
    }
    else if (pn != pc) {
      this.check = true;
      this.checkpn = false;
      this.message = 'Mật khẩu không trùng khớp!'
    }
    else {
      this.check = false;
      const datapasing: IDataNoti = {
        title: 'SUCCESSFUL!',
        des: 'Change Password successful!',
        routerLink: '/main'
      }
      var ps = {
        "current_password": cp,
        "new_password": pn,
        "new_password_confirmation": pc
      }
      this.modal.dismiss(null, undefined, null)
      this.loadService.present()
      this.authService.resetPassword(ps).subscribe(data => {
        this.pageNotiService.setdataStatusNoti(datapasing);
        this.router.navigateByUrl('/page-noti');
        this.loadService.dismiss();
      })
    }
  }
}
