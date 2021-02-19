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
  avatar: any;
  constructor(
    private router: Router,
    private OneSignalService: OneSignalService,
    private accountService: AccountService
  ) { }
  ionViewWillEnter () {
     this.name = localStorage.getItem('fullname');
    this.accountService.getAccounts().subscribe(data => {
      if(data.app_user.thumb_image == null) {
        data.app_user['thumb_image'] = "https://i.imgur.com/edwXSJa.png";
        this.avatar = data.app_user.thumb_image;
      }
      else {
        this.avatar =  data.app_user.thumb_image.url;
      }
    })
  }
  ngOnInit() {
    this.OneSignalService.startOneSignal();
  }
  routerLink(path) {
    this.router.navigateByUrl(path);
  } 
}
