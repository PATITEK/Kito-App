import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DonateService, EventsService, IPageEvent, AccountService, IPageRequest, AuthService, ParishesService } from '../@app-core/http';
import { DateTimeService, ImageService, LoadingService } from '../@app-core/utils';
import { ToastController } from '@ionic/angular';
import { DioceseService } from '../@app-core/http/diocese';

@Component({
  selector: 'app-pray',
  templateUrl: './pray.page.html',
  styleUrls: ['./pray.page.scss'],
})
export class PrayPage implements OnInit {
  frmPray: FormGroup;
  error_messages = {
    'amount': [
      { type: 'require', message: 'This field must have a value for donate !' }
    ],

  }
  isHidden = false;
  isChoose = false;
  source_type: any;
  source_id: any;
  id_change: any;
  required_mess = false;
  name;
  message_purpose = "";
  required_purpose = false;
  message = "";
  clicked = false;
  url: any;
  events;
  dataParams;
  avatar: any;
  img;
  name_diocese;
  id_diocese;
  address;
  chabad = {
    name: ' ',
    thumb_image: ''
  }
  req: any;
  setamount: any;

  pageResult: IPageRequest = {
    page: 1,
    per_page: 100,
  };
  type;
  getData;
  bishop_name;
  data;
  level = 'Linh';
  type_page = 'pray';
  headerCustom = { title: 'Xin lễ', background: '#e5e5e5' };

  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public donateService: DonateService,
    public loadingService: LoadingService,
    private accountService: AccountService,
    public toastController: ToastController,
    public parishesService: ParishesService,
    public imageService: ImageService,
    private diocesesService: DioceseService,
    private authService: AuthService,

  ) {
    this.frmPray = this.formBuilder.group({
      note: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      amount: new FormControl('', [])
    });
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }
  ngOnInit() {
    this.loadingService.present();
    this.name = localStorage.getItem('fullname');
  }
  getUrl() {
    if (!this.img) {
      return `url("https://i.imgur.com/UKNky29.jpg")`
    }
    else return `url(${this.img})`
  }
  ionViewWillEnter() {
    let url = window.location.href;
    if (url.includes('?')) {
      this.route.queryParams.subscribe(params => {
        this.data = JSON.parse(params['data']);
        this.source_id = this.data.id;
      });
    }
    else {
      this.source_id = parseInt(localStorage.getItem('parish_id'));
      this.level = 'Linh'
      this.parishesService.getDetail(this.source_id).subscribe((data: any) => {
        this.loadingService.dismiss();
        this.getData = data.parish;
        this.address = this.getData.address;
        this.name_diocese = this.getData.name;
        this.bishop_name = this.getData.priest_name;
        this.imgNotFound(this.getData)
        this.img = this.getData.thumb_image.url
      })
    }

    if (this.data && this.data.source_type == 'Diocese') {
      this.source_type = this.data.source_type;
      this.level = 'Giám'
      this.loadingService.dismiss();
      this.diocesesService.getDetail(this.source_id).subscribe((data: any) => {
        this.loadingService.dismiss();
        this.getData = data.diocese;
        this.address = this.getData.address;
        this.name_diocese = this.getData.name;
        this.bishop_name = this.getData.bishop_name;
        this.imgNotFound(this.getData)
        this.img = this.getData.thumb_image.url
      })
    }
    else if (this.data && this.data.source_type == 'Parishes') {
      this.source_type = this.data.source_type;
      this.level = 'Linh'
      this.parishesService.getDetail(this.source_id).subscribe((data: any) => {
        this.loadingService.dismiss();
        this.getData = data.parish;
        this.address = this.getData.address;
        this.name_diocese = this.getData.name;
        this.bishop_name = this.getData.priest_name;
        this.imgNotFound(this.getData)
        this.img = this.getData.thumb_image.url
      })
    }
    this.avatar = localStorage.getItem('avatar');
  }
  imgNotFound(item) {
    !item?.thumb_image?.url && (item.thumb_image = { url: "https://i.imgur.com/UKNky29.jpg" });
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

  onSubmit() {
    let amount = this.frmPray.get('amount')
    if (amount.dirty || amount.touched) {
      if (amount.value != "" && amount.value < 12000) {
        this.required_mess = true;
        this.message = 'Số tiền đóng góp phải lớn hơn 12,000.';
        return;
      }
      else {
        this.required_mess = false;
      }
    }
    if (amount.value == "") {
      this.setamount = 0;
    }
    else {
      this.setamount = amount.value;
    }
    var result = {
      "donation": {
        "email": localStorage.getItem('email'),
        "amount": this.setamount,
        "note": this.frmPray.get('note').value,
        "source_type": "Diocese",
        "source_id": localStorage.getItem('parish_id')
      }
    }
    if (amount.value == "") {
      this.donateService.donateLog(result).subscribe((data) => {
        this.presentToast('Pray successfully!');
      })
    }
    else {
      result.donation['token'] = '';
      this.router.navigate(['paymentmethods'], {
        queryParams: {
          data: JSON.stringify(result)
        }
      })
    }
  }
  async goToDioceses() {
    const data = {
      type_page: this.type_page
    }
    this.router.navigate(['/dioceses'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }
}