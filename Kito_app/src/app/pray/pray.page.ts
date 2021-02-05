import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DonateService, ChabadService,EventsService, IPageEvent } from '../@app-core/http';
import { DateTimeService, LoadingService } from '../@app-core/utils';
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
  DAY = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  MONTH = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  today: any;
  dateList = [];
  DateObj = '';
  fulldate: any;
  date: any;
  month :any;
  year: any;
  public tab = 'pray'
  isHidden = false;
  isChoose = false;
  source_type: any;
  source_id: any;
  id_change :any;
  required_mess  = false;
  message_purpose = "";
  required_purpose = false;
  message = "";
  clicked = false;
  url: any;
  events;
  dataParams;
  chabad = {
    name: ' ',
    thumb_image: ''
  }
  req: any;
  pageRequestEvent: IPageEvent = {
    page: 1,
    per_page: 100,
    cal_date: '',
    chabad_id: ''
  }
  
  constructor(
    public formBuilder: FormBuilder,
     private route: ActivatedRoute,
     private eventService: EventsService,
     public donateService: DonateService,
     public chabadService: ChabadService,
     public dateTimeService: DateTimeService,
     public loadingService: LoadingService,
     public toastController: ToastController
  ) {
    this.frmPray = this.formBuilder.group({
      amount: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      note: new FormControl('',[])
   });
    this.today = new Date();
    for (let i = 0; i < 7; i++) {
      let nextDay = new Date(this.today);
      nextDay.setDate(nextDay.getDate() + i);
      this.dateList.push({
        "id": i,
        "day": this.DAY[nextDay.getDay()].substring(0, 3),
        "fullday": this.DAY[nextDay.getDay()],
        "date": nextDay.getDate(),
        "month": this.MONTH[this.today.getMonth()],
        "year" : this.today.getFullYear(),
        "eventslength": 0,
        "full": nextDay,
       
      })
    }
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }
  displayDate(item) {
    this.fulldate = item.fullday;
      this.date = item.date;
      this.month = item.month;
      this.year = item.year;
      this.DateObj = `${this.fulldate}, ${this.date} ${this.month} ${ this.year}`;
      this.id_change = item.id;
      this.clicked = true;
  }
  ngOnInit() {
    this.loadingService.present();
      this.route.queryParams.subscribe(params => {
      this.dataParams = JSON.parse(params['data']);
      this.chabadService.getDetail(this.dataParams.chabad.id).subscribe(data => {
            this.chabad = data.chabad;
            this.loadingService.dismiss();
      });
    })
    this.getDataEvents();
    
  }
  getDataEvents() {
    for (let i = 0; i < 7; i++) {
      this.pageRequestEvent.cal_date = this.dateTimeService.getDateString2(this.dateList[i].full);
      this.pageRequestEvent.chabad_id = this.dataParams.chabad.id;
      this.eventService.getAll(this.pageRequestEvent).subscribe(data => {
          this.dateList[i].eventslength = data.meta.pagination.total_objects;
      })
      
    }
  }
  ionViewWillEnter() {
    if(this.DateObj === '') {
      this.fulldate = `${this.dateList[0].fullday}`;
      this.date = `${this.dateList[0].date}`;
      this.month = `${this.dateList[0].month}`;
      this.year = `${this.dateList[0].year}`;
      this.DateObj = `${this.fulldate}, ${this.date} ${this.month} ${ this.year}`;
    }
    else {
      return
    }
  }
  getUrl() {
    return `url(${this.chabad.thumb_image})`
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
  onSubmit() {
    var result = {
      "donation_log" : {
        "amount": this.frmPray.get('amount').value,
        "note": this.frmPray.get('note').value,
        "source_type": this.dataParams.type,
        "source_id":  this.dataParams.chabad.id
      }
    }
    if (this.frmPray.get('amount').dirty || this.frmPray.get('amount').touched ) {
      if(this.frmPray.get('amount').value.length == 0) {
        this.required_mess = true;
        this.message = 'This field have a value!';
      }
      else if(this.frmPray.get('amount').value %18 !==0){
        this.required_mess = true;
        this.message = 'The number must be divisible by 18.';
      }
      else {
        this.required_mess = false;
      }
    }
    if (this.frmPray.get('note').dirty || this.frmPray.get('note').touched ) {
      if(this.frmPray.get('note').value.length == 0) {
        this.required_purpose = true;
        this.message_purpose = 'This field is require.';
      }
      else {
        this.required_purpose = false;
      }
    }
    if(this.frmPray.get('amount').value %18 ===0) {
      this.donateService.donateLog(result).subscribe((data) => {
        // console.log(data);
        this.presentToast('Pray successfully!');
    })
    }
    else {
    }
  }
}
