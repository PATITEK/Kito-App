import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { AuthService } from 'src/app/@app-core/http';

@Component({
  selector: 'app-modal-donate',
  templateUrl: './modal-donate.component.html',
  styleUrls: ['./modal-donate.component.scss'],
})
export class ModalDonateComponent implements OnInit {
  constructor(private router: Router, 
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private authService: AuthService
    ) { 
    }
    @Input() diocese_id: any;
    @Input() type: any;
    ngOnInit() {
  }
  async closeModal() {
    await this.modalCtrl.dismiss();
  }
  gotoDestination() {
    const data = {
      id: this.diocese_id,
      source_type: 'Diocese',
      type: this.type
    }
    this.closeModal();
    if(this.type == 'donate') {
      this.router.navigate(['donate'], {
        queryParams: {
          data: JSON.stringify(data)
        }
      })
    }
    else if(this.type == 'pray'){
      this.router.navigate(['pray'], {
        queryParams: {
          data: JSON.stringify(data)
        }
      })
    }
  }
  goToParishes() {
    const data = {
      id: this.diocese_id,
      source_type: 'Parishes',
      type: this.type
    }
    this.authService.sendData(data)
    this.router.navigateByUrl('/parishes')
    this.closeModal();
  }
}
