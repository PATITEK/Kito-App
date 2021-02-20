import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/@app-core/http/account/account.service';
import { ImageService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-popoverimage',
  templateUrl: './popoverimage.component.html',
  styleUrls: ['./popoverimage.component.scss'],
})
export class PopoverimageComponent implements OnInit {

  constructor(
    private imageService: ImageService,
    private accountService: AccountService
  ) { }
  avatar = '';
  ngOnInit() {
    // this.imageService.getImage();
    this.accountService.getAccounts().subscribe(data => {
      if(data.app_user.thumb_image == null) {
        data.app_user['thumb_image'] = "https://i.imgur.com/edwXSJa.png";
        this.avatar = data.app_user.thumb_image;
      }
      else if( data.app_user.thumb_image.url == null) {
        data.app_user['thumb_image'] = "https://i.imgur.com/edwXSJa.png";
        this.avatar = data.app_user.thumb_image;
      }
      else {
        this.avatar =  data.app_user.thumb_image.url;
      }
  })
  }
  getUrl() {
    return `url(${this.avatar})`
  }
}
