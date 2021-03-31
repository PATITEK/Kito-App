import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/@app-core/http/account/account.service';
import { ImageService, LoadingService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-popoverimage',
  templateUrl: './popoverimage.component.html',
  styleUrls: ['./popoverimage.component.scss'],
})
export class PopoverimageComponent implements OnInit {

  constructor(
    private imageService: ImageService,
    private accountService: AccountService,
    private loadingService: LoadingService
  ) { }
  avatar = '';
  ngOnInit() {
    this.loadingService.dismiss();
    // this.imageService.getImage();
    this.avatar = localStorage.getItem('avatar');
  }
  getUrl() {
    return `url(${this.avatar})`
  }
}
