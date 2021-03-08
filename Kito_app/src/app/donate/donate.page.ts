import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService, AuthService, DonateService, IPageRequest } from '../@app-core/http';
import { ImageService, LoadingService } from '../@app-core/utils';
import { ModalController, ToastController } from '@ionic/angular';
import { DioceseService } from '../@app-core/http/diocese';


@Component({
  selector: 'app-donate',
  templateUrl: './donate.page.html',
  styleUrls: ['./donate.page.scss'],
})
export class DonatePage implements OnInit {
  public tab = 'pray'
  isHidden = false;
  isChoose = false;
  source_id: any;
  source_type: any;
  required_mess = false;
  message_purpose = "";
  required_purpose = false;
  message = "";
  img;
  name_diocese;
  address;
  email = '';
  name;
  avatar = '';
  id_diocese: Number;
  data;
  frmDonate: FormGroup;
  previousUrl;
  error_messages = {
    'amount': [
      {
        type: 'require', message: 'This field must have a value!'
      }
    ],
  }
  dataParams;
  chabad = {
    name: '',
    thumb_image: ''
  }
  pageResult: IPageRequest = {
    page: 1,
    per_page: 100,
  }
  type: {
    type: any
  }
  title ='Đóng góp';
  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public donateService: DonateService,
    public loadingService: LoadingService,
    public toastController: ToastController,
    private imageService: ImageService,
    private authService: AuthService,
    private accountService: AccountService,
    private diocesesService: DioceseService,
  ) {
    this.frmDonate = this.formBuilder.group({
      amount: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      note: new FormControl('', Validators.compose([
      ])),
    });
  }
  ngOnInit() {
    this.loadingService.present()
    this.name = localStorage.getItem('fullname');
    this.authService.receiveData.subscribe(data => {
      this.type = data;
    })
  }
  ionViewWillEnter() {
    this.route.queryParams.subscribe(params => {
      this.data = JSON.parse(params['data']);
    })
    if (this.data) {
      this.source_id = this.data.id;
      this.source_type = this.data.source_type;
    }
    else {
      this.source_id = localStorage.getItem('parish_id');
      this.source_type = 'Parishes';

    }
    this.id_diocese = parseInt(localStorage.getItem('diocese_id'));
    this.diocesesService.getAll(this.pageResult).subscribe((data: any) => {
      data.dioceses.forEach(i => {
        if (i.id == this.id_diocese) {
          this.address = i.address;
          this.name_diocese = i.name;
          if (i.thumb_image == null) {
            this.loadingService.dismiss();
            this.img = 'https://i.imgur.com/UKNky29.jpg'
          }
          else if (i.thumb_image.url == null) {
            this.loadingService.dismiss();
            this.img = 'https://i.imgur.com/UKNky29.jpg'
          }
          else {
            this.loadingService.dismiss();
            this.img = i.thumb_image.url;
          }
        }
      });
    });
    this.avatar = localStorage.getItem('avatar');
  }
  getUrl() {
    if (!this.img) {
      return `url("https://i.imgur.com/UKNky29.jpg")`
    }
    else return `url(${this.img})`
  }

  onSubmit() {
    this.loadingService.present();
    var donate = {
      "donation": {
        "email": localStorage.getItem('email'),
        "token": "",
        "amount": this.frmDonate.get('amount').value,
        "note": this.frmDonate.get('note').value,
        "source_type": this.source_type,
        "source_id": this.source_id
      }
    }
    if (this.frmDonate.get('amount').dirty || this.frmDonate.get('amount').touched) {
      if (this.frmDonate.get('amount').value < 12000) {
        this.required_mess = true;
        this.message = 'Số tiền đóng góp phải lớn hơn 12,000';
        this.loadingService.dismiss();
        return;
      }
      else {
        this.required_mess = false;
        this.loadingService.dismiss();
      }
    }
    if (this.frmDonate.get('note').dirty || this.frmDonate.get('note').touched) {
      if (this.frmDonate.get('note').value.length == 0) {
        this.required_purpose = true;
        this.message_purpose = 'Thêm thông tin vào trường này !';
        this.loadingService.dismiss();
        return;
      }
      else {
        this.required_purpose = false;
        this.loadingService.dismiss();
      }
    }
    if (this.frmDonate.get('note').value.length == 0) {
      this.required_purpose = true;
      this.message_purpose = 'Thêm thông tin vào trường này !';
      this.loadingService.dismiss();
      return;
    }
    else {
      this.required_purpose = false;
      this.loadingService.dismiss();
    }
    this.router.navigate(['paymentmethods'], {
      queryParams: {
        data: JSON.stringify(donate)
      }
    })

  }
  clickHidden(e) {
    if (this.isHidden == false) {
      this.isHidden = true;
      e.target.classList.add('btn__nameless_dis_pray');
    }
    else {
      this.isHidden = false;
      e.target.classList.remove('btn__nameless_dis_pray');
    }
  }

  btnActivate(e) {
    this.isChoose = true;
    let choosed = document.querySelectorAll('day');
    choosed.forEach(element => {
      element.classList.remove(('day'));
      document.getElementById('day-choose').style.background = '#64C18E';
    });
    e.target.classList.add('active-button');
  }
  async goToDioceses() {
    const data = {
      type: this.type.type
    }
    this.authService.sendData(data)
    this.router.navigateByUrl('/dioceses')
  }


}