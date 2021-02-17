import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  name = localStorage.getItem('fullname') || '';

  constructor(
    private router: Router
  ) { }
  ionViewWillEnter () {
    // localStorage.setItem('Authorization', 'eyJhbGciOiJIUzI1NiJ9.eyJhcHBfdXNlcl9pZCI6MSwiZXhwIjoxNjEyOTQ4MjQ1fQ.FIsNqEvPmAsdP7lMIkOLTL99mFVt1-Bll840nUBG7eg')
   }
  ngOnInit() {
  }
  routerLink(path) {
    console.log(path);
    this.router.navigateByUrl('main/'+ path);
  }
  // goToUserInfo() {
  //   this.router.navigateByUrl('account-setting');
  // }
}
