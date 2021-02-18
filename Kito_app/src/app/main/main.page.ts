import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../@app-core/http';
import { OneSignalService } from '../@app-core/utils';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  name = '';
  avatar = 'assets/img/avatar-account.svg';

  constructor(
    private router: Router,
    private OneSignalService: OneSignalService,
    private accountService: AccountService
  ) { }
  ionViewWillEnter () {
    this.accountService.getAccounts().subscribe((data) => {
      localStorage.setItem('avatar', data.app_user.thumb_image.url);
      localStorage.setItem('fullname', data.app_user.full_name)
    })
    if(localStorage.getItem('avatar')) {
      this.avatar = localStorage.getItem('avatar');
    }
    this.name = localStorage.getItem('fullname');
  }
  ngOnInit() {
    this.OneSignalService.startOneSignal();
  }
  routerLink(path) {
    this.router.navigateByUrl(path);
  } 

  // goToUserInfo() {
  //   this.router.navigateByUrl('account-setting');
  // }
}
