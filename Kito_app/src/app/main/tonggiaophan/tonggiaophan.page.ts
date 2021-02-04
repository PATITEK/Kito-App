import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-tonggiaophan',
  templateUrl: './tonggiaophan.page.html',
  styleUrls: ['./tonggiaophan.page.scss'],
})
export class TonggiaophanPage implements OnInit {

  constructor(public platform: Platform) { 
    
  }

  ngOnInit() {
    if (this.platform.is("android")) {
      document.querySelector('ion-searchbar').style.marginTop ="10px";
      document.querySelector('ion-searchbar').style.marginBottom ="20px"

    }
     
  }

}
