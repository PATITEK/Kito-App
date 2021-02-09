import { Injectable } from '@angular/core';

@Injectable()
export class DateTimeService {
  public DAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  public VIETNAMESE_DAYS = [
    'Hai',
    'Ba',
    'Tư',
    'Năm',
    'Sáu',
    'Bảy',
    'CN'
  ];

  public VIETNAMESE_DAYS_2 = [
    'Thứ hai',
    'Thứ ba',
    'Thứ tư',
    'Thứ năm',
    'Thứ sáu',
    'Thứ bảy',
    'Chủ nhật'
  ];

  public MONTHS = [
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

  constructor() { }

  // Thursday, 03 January 2021
  public getDateString(day) {
    return `${this.DAYS[day.getDay()]}, ${day.getDate()} ${this.MONTHS[day.getMonth()]} ${day.getFullYear()}`;
  }

  // 2021-01-01
  public getDateString2(day) {
    return `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`;
  }

  // Thursday, 03 January 2021
  public getDateString3(day) {
    return `${this.VIETNAMESE_DAYS_2[day.getDay()]} - ${day.getDate()}.${day.getMonth()}.${day.getFullYear()}`;
  }
}
