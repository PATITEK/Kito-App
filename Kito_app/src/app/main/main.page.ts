import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OneSignalService } from '../@app-core/utils';
import { CameraService } from '../@app-core/utils/camera.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  name = localStorage.getItem('fullname');
  avatar = 'assets/img/avatar-account.svg';

  constructor(
    private router: Router,
    private OneSignalService: OneSignalService,
  ) { }
  ionViewWillEnter () {
    if(localStorage.getItem('avatar')) {
      this.avatar = localStorage.getItem('avatar');
    }
    // localStorage.setItem('Authorization', 'eyJhbGciOiJIUzI1NiJ9.eyJhcHBfdXNlcl9pZCI6MSwiZXhwIjoxNjEyOTQ4MjQ1fQ.FIsNqEvPmAsdP7lMIkOLTL99mFVt1-Bll840nUBG7eg')
  }
  ngOnInit() {
    this.OneSignalService.startOneSignal();
  }
  routerLink(path) {
    console.log(path);
    this.router.navigateByUrl(path);
  } 
  // goToUserInfo() {
  //   this.router.navigateByUrl('account-setting');
  // }
}
