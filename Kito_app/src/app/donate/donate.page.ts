import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService, AuthService, DonateService, IPageRequest, ParishesService } from '../@app-core/http';
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
  bishop_name;
  level;
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
 type_page = 'donate';
 type_donate;
  getData;
  headerCustom = { title: 'Đóng góp', background: '#e5e5e5' };
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
    private parishService: ParishesService
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
    this.loadingService.present();
    this.name = localStorage.getItem('fullname');
  }
  imgNotFound(item) {
    !item?.thumb_image?.url && (item.thumb_image = {url: "https://i.imgur.com/UKNky29.jpg"});
  }
  ionViewWillEnter() {
    let url = window.location.href;
      if(url.includes('?')){
        this.route.queryParams.subscribe(params => {
          this.data = JSON.parse(params['data']);
          this.source_id = this.data.id;
        });
      }
      else {
      this.source_id = parseInt(localStorage.getItem('parish_id'));
      this.level = 'Linh'
      this.parishService.getDetail(this.source_id).subscribe((data: any) => {
        this.loadingService.dismiss();
           this.getData = data.parish;
            this.address = this.getData.address;
            this.name_diocese =this.getData.name;
            this.bishop_name =this.getData.priest_name;
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
              this.name_diocese =this.getData.name;
              this.bishop_name =this.getData.bishop_name;
              this.imgNotFound(this.getData)
              this.img = this.getData.thumb_image.url
      })
    }
    else if(this.data && this.data.source_type == 'Parishes') {
      this.source_type = this.data.source_type;
      this.level = 'Linh'
      this.parishService.getDetail(this.source_id).subscribe((data: any) => {
        this.loadingService.dismiss();
           this.getData = data.parish;
            this.address = this.getData.address;
            this.name_diocese =this.getData.name;
            this.bishop_name =this.getData.priest_name;
            this.imgNotFound(this.getData)
            this.img = this.getData.thumb_image.url
    })
  }
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
   goToDioceses() {
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