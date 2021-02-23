import { Injectable } from '@angular/core';

@Injectable()
export class DateTimeService {
  public DAYS = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
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
  public getDateString(date: Date) {
    return `${this.DAYS[date.getDay()]}, ${date.getDate()} ${this.MONTHS[date.getMonth()]} ${date.getFullYear()}`;
  }

  // 2021-01-01
  public getDateString2(date: Date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  // Thursday, 03 January 2021
  public getDateString3(date: Date) {
    return `${this.VIETNAMESE_DAYS_2[date.getDay()]} - ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
  }

  // 5:00
  public getTimeString(date: Date) {
    return `${date.getHours()}:${date.getMinutes()}`;
  }

  public numberWithCommas(str) {
    let parts = str.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
  }

  public isEmptyObject(obj) {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
  }
}
