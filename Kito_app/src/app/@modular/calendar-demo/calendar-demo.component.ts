import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
@Component({
  selector: 'app-calendar-demo',
  templateUrl: './calendar-demo.component.html',
  styleUrls: ['./calendar-demo.component.scss'],
})
export class CalendarDemoComponent implements OnInit {
  dayWeeks = [
    {
      valueView: "CN",
      value: 0
    },
    {
      valueView: "Th2",
      value: 1
    },
    {
      valueView: "Th3",
      value: 2
    },
    {
      valueView: "Th4",
      value: 3
    },
    {
      valueView: "Th5",
      value: 4
    },
    {
      valueView: "Th6",
      value: 5
    },
    {
      valueView: "Th7",
      value: 6
    },



  ]
  dayOfMonth;
 coutnCalendar=12;
 toggleFiller=false;
  today = new Date();
  currentMonth = this.today.getMonth();
  currentYear = this.today.getFullYear();
  AmLich=[];
  slides: IonSlides;
  slideOpts = {
    
    initialSlide: this.coutnCalendar+10,
    speed: 400
  };
  constructor(
    private route:Router
  ) { 
    
  }

  
  ngOnInit() {
    
    this.dayOfMonth = this.calendar(this.currentMonth, this.currentYear);
//   

  }
  numSequence(n: number): Array<number> {
    return Array(n);
  } 
  toggleFillerClick() {
      this.toggleFiller=!this.toggleFiller;
  }
gotoDetail(e){
  console.log(e);
  
  // this.route.navigate(['/main/calendar-detail'], {
  //   queryParams: {
  //     data: JSON.stringify(e)
  //   }
  // })
  
  this.toggleFiller=false;
}
  // getDaysInMonth(month, year) {
  //   var monthIndex = month - 1; // 0..11 instead of 1..12
  //   var date = new Date(year, monthIndex, 1);
  //   var result = [];
  //   while (date.getMonth() == monthIndex) {
  //     result.push(date.getDate());
  //     date.setDate(date.getDate() + 1);
  //   }
  //   return result;
  // }
  nextMonth() {
    
  ;
    if (this.currentMonth == 12) {
      this.currentYear++;
      this.currentMonth = 1
    }
    else {
      this.currentMonth = this.currentMonth + 1;
    }

    this.dayOfMonth = this.calendar(this.currentMonth, this.currentYear);
    // this.slides.update()

  }
  ionSlideNextEnd(){
    this.nextMonth();
    this.coutnCalendar++;
  }

  ionSlidePrevEnd(){
    this.PrewMonth();
    this.coutnCalendar++;
  }
  PrewMonth() {
    if (this.currentMonth == 1) { 
      this.currentYear--;
      this.currentMonth = 13  
    }
    this.currentMonth = this.currentMonth - 1;
    this.dayOfMonth = this.calendar(this.currentMonth, this.currentYear);


  }
  century(y) {
    return Math.floor(y / 100);
  }

  // hàm tính tháng cho công thức zeller
  month(m) {
    return m < 3 ? m + 10 : m - 2;
  }

  // hàm tính năm trong thể kỷ
  year(y) {
    return y % 100;
  }

  // công thức zeller
  _zeller(day, month, year, century) {
    return ((13 * month - 1) / 5 + year / 4 + century / 4 + day + year - 2 * century) % 7;
  }

  // viết lại cho dễ dùng
  zeller(d, m, y) {
    return this._zeller(d, this.month(m), this.year(y), this.century(y));
  }
  isLeap(year) {
    if ((year % 4) || ((year % 100 === 0) && (year % 400))) return 0;
    else return 1;
  }
  daysIn(month, year) {
    return month === 2 ? (28 + this.isLeap(year)) : 31 - (month - 1) % 7 % 2;
  }
  
  
  calendar(month, year) {

    var startIndex = Math.trunc(this.zeller(1, month, year));

    if (startIndex < 0) {
      startIndex = startIndex + 7;
    }
    if (startIndex === -0) {
      startIndex = startIndex + 7;
    }
    var endIndex = this.daysIn(month, year);


    var result = Array.apply(0, Array(42)).map(function (i) { return 0; });


    for (var i = startIndex; i < endIndex + startIndex; i++) {

      result[i - 1] = (i - startIndex) + 1;

    }
    return result;
  }
}

