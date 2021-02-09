import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DonateService, ChabadService, AccountService } from '../@app-core/http';
import { LoadingService } from '../@app-core/utils';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-donate',
  templateUrl: './donate.page.html',
  styleUrls: ['./donate.page.scss'],
})
export class DonatePage implements OnInit {
  public tab = 'pray'
  isHidden = false;
  isChoose = false;
  source_type: any;
  required_mess  = false;
  message_purpose = "";
  required_purpose = false;
  message = "";
  source_id: any;
  frmDonate: FormGroup;
  email = '';
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

  constructor(
    private router: Router, 
    private chabadService: ChabadService,
    public formBuilder: FormBuilder,
     private route: ActivatedRoute,
     public donateService: DonateService,
     public loadingService: LoadingService,
     public toastController: ToastController,
     private accountService: AccountService
     ) {
    this.frmDonate = this.formBuilder.group({
      amount: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      note: new FormControl('', Validators.compose([
        //Validators.required,
      ])),
   });
  }
  ngOnInit() {
    // this.loadingService.present()
    // this.route.queryParams.subscribe(params => {
    //   this.dataParams = JSON.parse(params['data']);
    //   this.chabadService.getDetail(this.dataParams.chabad.id).subscribe(data => {
    //         this.chabad = data.chabad
    //         this.loadingService.dismiss()
    //   })
    // })
    // this.loadingService.present()
    // this.accountService.getAccounts().subscribe(data => {
    //   this.email = data.app_user.email;
    //   this.loadingService.dismiss();
    // });
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }
  // getUrl() {
  //   return `url(${this.chabad.thumb_image})`
  // }
    getUrl() {
    return `url(assets/img/19.jpg)`
  }
  
  onSubmit() {
    this.loadingService.present();
    const getNumber = this.frmDonate.get('amount').value;
    if(getNumber%18 == 0 && getNumber>0) {
    }
    // const sourceId = this.dataParams.event ? this.dataParams.event.id : this.dataParams.chabad.id;
    // var result = {
    //   "donation" : {
    //     "email": this.email,
    //     "token": localStorage.getItem('Authorization'),
    //     "amount": this.frmDonate.get('amount').value,
    //     "note": this.frmDonate.get('note').value,
    //     "source_type": this.dataParams.type,
    //     "source_id": sourceId
    //   }
    // }
    var donate = {
      "donation" : {
        "email": "hoaimiqng@gmail.com",
        "token": "",
        "amount": this.frmDonate.get('amount').value,
        "note": this.frmDonate.get('note').value,
        "source_type": "Event",
        "source_id": 1
      }
    }
    if (this.frmDonate.get('amount').dirty || this.frmDonate.get('amount').touched ) {
      if(this.frmDonate.get('amount').value < 18 ) {
        this.required_mess = true;
        this.message = 'The number must be greater than 18$';
        this.loadingService.dismiss();
        return;
      }
      else if(this.frmDonate.get('amount').value %18 !==0){
        this.required_mess = true;
        this.message = 'The number must be divisible by 18!';
        this.loadingService.dismiss();
        return;

      }
      else {
        this.required_mess = false;
        this.loadingService.dismiss();
      }
    }
    if (this.frmDonate.get('note').dirty || this.frmDonate.get('note').touched ) {
      if(this.frmDonate.get('note').value.length == 0) {
        this.required_purpose = true;
        this.message_purpose = 'This field is require!';
        this.loadingService.dismiss();
        return;
      }
      else {
        this.required_purpose = false;
        this.loadingService.dismiss();
      }
    }
    if(this.frmDonate.get('note').value.length == 0) {
      this.required_purpose = true;
      this.message_purpose = 'This field is require!';
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
  clickPray() {
    this.tab = 'pray';
  }
  clickDonate() {
    this.tab = 'donate';
  }
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

  btnActivate(e) {
    this.isChoose = true;
    let choosed = document.querySelectorAll('day');
    choosed.forEach(element => {
      element.classList.remove(('day'));
      document.getElementById('day-choose').style.background = '#64C18E';
    });
    e.target.classList.add('active-button');
  }
}
