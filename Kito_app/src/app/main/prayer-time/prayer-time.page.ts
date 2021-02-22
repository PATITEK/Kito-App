import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonSlides } from '@ionic/angular';
import { EventsService, IPageEvent } from 'src/app/@app-core/http';
import { DateTimeService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-prayer-time',
  templateUrl: './prayer-time.page.html',
  styleUrls: ['./prayer-time.page.scss'],
})
export class PrayerTimePage implements OnInit {
  @ViewChild('slides', { static: false }) slides: IonSlides;
  @ViewChild(IonContent) ionContent: IonContent;

  slideOptions = {
    initialSlide: 0,
    autoHeight: true
  };
  
  pageResult:IPageEvent={
    cal_date: ''
  }
  dataEvent=[];
  parish = {
    thumbImage: 'assets/img/tonggiaophan/hanoi.svg',
    name: 'Giáo xứ Chánh Tòa Sài Gòn'
  }

  dateList = [];
  activeDateItemId;

  parishNameHeight = 0;

  constructor(
    public dateTimeService: DateTimeService,
    private router: Router,
    private eventService: EventsService
  ) {
    
  }

  ngOnInit() {
    this.initDateList();
  }

  ionViewWillEnter() {
    const dateItemId = localStorage.getItem('dateItemId');
    if (dateItemId) {
      this.changeSegment(dateItemId);
      localStorage.removeItem('dateItemId');  
    }
  }

  ionViewDidEnter() {
    const parishNameElement : any = document.querySelector('.parish-name');
    this.parishNameHeight = parishNameElement.offsetHeight;
  }

  async initDateList() {
    const now = new Date();
    
    for (let i = 0; i < 7; i++) {
      
      let nextDay = new Date(now);
      nextDay.setDate(nextDay.getDate()+i);
      console.log(nextDay);
      
      // const randNum = Math.floor(Math.random() * 6);
      this.pageResult.cal_date=this.getDate(nextDay);
      await this.eventService.getAll(this.pageResult).subscribe((data: any) => {
      

        this.dataEvent=data.calendar.events;
        
        if(this.dataEvent!=undefined){
          let events=[];
          
          for (let i = 0; i < this.dataEvent.length; i++) {
            let house=new Date(this.dataEvent[i].start_time);
            let test=this.formatDate(house)
            console.log(house);
            
            let name="Lễ Sáng"
            if(house.getUTCHours()>12)
            {
              name="Lễ Chiều"
            }
            events.push({
              name: name,
              time: test,
              text: this.dataEvent[i].description,
              id:this.dataEvent[i].id
            })
          }
         
         
          this.dateList.push({
            id: i,
            day: nextDay,
            name: this.dataEvent[i].description,
            events: events
          })
        }
        else{
          this.dateList.push({
            id: i,
            day: nextDay,
            name: 'Đức Mẹ hồn lìa xác lên trời',
            events: []
          })
        }
        
        
        
        this.activeDateItemId = this.dateList[0].id;
        // this.pageResult.total_objects = data.meta.pagination.total_objects || 1;
      });
      
      
      // console.log(this.dateList);
      
    }
    
    console.log(this.dateList);
    
  }
   formatDate(date) {
    var hours = date.getUTCHours();
    var minutes = date.getUTCMinutes();
    // var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes
    return (strTime);
  }
  changeDateItem(id) {
    this.activeDateItemId = id
  
    
  }

  changeSegmentSlide() {
    this.slides.getActiveIndex().then(index => {
      this.changeDateItem(index);
    })
  }
  
  scrollToTop(value) {
    this.ionContent.scrollToTop(value);
  }

  changeSegment(id) {
    
    this.slides.slideTo(id).then(() => this.changeDateItem(id));
  }

  goToEventDetail(dateItem, event) {
    const data = {
      dateList: this.dateList,
      dateItem: dateItem,
      event: event
    }
    this.router.navigate(['main/prayer-time/prayer-detail'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }
getDate(date){
var month = date.getUTCMonth() + 1; //months from 1-12
var day = date.getUTCDate();
var year = date.getUTCFullYear();

return year + "-" + month + "-" + day;
}
  paddingTopIonContent() {
    return `calc(60vw + ${this.parishNameHeight}px + 60px + 15px)`
  }
}
