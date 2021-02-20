import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DonateService, ChabadService,EventsService, IPageEvent, AccountService } from '../@app-core/http';
import { DateTimeService, ImageService, LoadingService } from '../@app-core/utils';
import { ToastController } from '@ionic/angular';

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
  id_change :any;
  required_mess  = false;
  name;
  message_purpose = "";
  required_purpose = false;
  message = "";
  clicked = false;
  url: any;
  events;
  dataParams;
  avatar: any;
  chabad = {
    name: ' ',
    thumb_image: ''
  }
  req: any;
  setamount :any;
  pageRequestEvent: IPageEvent = {
    page: 1,
    per_page: 100,
    cal_date: '',
    chabad_id: ''
  }
  
  constructor(
    public formBuilder: FormBuilder,
     private route: ActivatedRoute,
     private router: Router,
     public donateService: DonateService,
     public chabadService: ChabadService,
     public loadingService: LoadingService,
     private accountService: AccountService,
     public toastController: ToastController,
     public imageService: ImageService
  ) {
    this.frmPray = this.formBuilder.group({
      note: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      amount: new FormControl('',[])
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
    // this.loadingService.present();
    //   this.route.queryParams.subscribe(params => {
    //   this.dataParams = JSON.parse(params['data']);
    //   this.chabadService.getDetail(this.dataParams.chabad.id).subscribe(data => {
    //         this.chabad = data.chabad;
    //         this.loadingService.dismiss();
    //   });
    // })
    //this.dataParams.chabad.id = 6;
    //this.getDataEvents();
    this.name = localStorage.getItem('fullname')
  }
  ionViewWillEnter() {
    // this.imageService.getImage();
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
  
  getUrl() {
    return `url(assets/img/19.jpg)`
  }
  //getUrl() {
  //   return `url(${this.chabad.thumb_image})`
  // }
 
  clickHidden(e) {
    if(this.isHidden == false) {
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
    if (amount.dirty || amount.touched ) {
      if(amount.value!= "" && amount.value < 12000) {
        this.required_mess = true;
        this.message = 'Số tiền đóng góp phải lớn hơn 12,000.';
        return;
      }
      
      else {
        this.required_mess = false;
      }
    }
    if(amount.value == "") {
      this.setamount = 0;
    }
    else {
      this.setamount = amount.value;
    }
    // var result = {
    //   "donation" : {
    //     "amount": this.setamount,
    //     "note": this.frmPray.get('note').value,
    //     "source_type": this.dataParams.type,
    //     "source_id":  this.dataParams.chabad.id
    //   }
    // }
    var result = {
      "donation" : {
        "email": localStorage.getItem('email'),
        "amount": this.setamount,
        "note": this.frmPray.get('note').value,
        "source_type": "Diocese",
        "source_id":  localStorage.getItem('parish_id')
      }
    }
    console.log(result);
    if(amount.value == "") {
          this.donateService.donateLog(result).subscribe((data) => { 
            console.log(data);
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
}
