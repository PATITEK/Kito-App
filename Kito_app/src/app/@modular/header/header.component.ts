import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() headerCustom: {title?: String, background?: String};
  
  constructor( public router: Router 
   
  ) { }

  ngOnInit() {}
  gotoMain() {
    this.router.navigateByUrl('/main')
  }
}
