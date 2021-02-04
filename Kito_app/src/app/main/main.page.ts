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

  ngOnInit() {
  }
  routerLink(path) {
    console.log(path);
    
    // this.router.navigate(['main/'+path]);
    this.router.navigateByUrl('main/'+path);
   
  }
 
  
  
  // goToUserInfo() {
  //   this.router.navigateByUrl('account-setting');
  // }
}
