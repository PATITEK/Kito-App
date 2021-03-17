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
    @Input() type_page: any;
    ngOnInit() {
  }
  async closeModal() {
    await this.modalCtrl.dismiss();
  }
  gotoDestination() {
    const data = {
      id: this.diocese_id,
      source_type: 'Diocese',
      type_page: this.type_page
    }
    this.closeModal();
    if(this.type_page == 'donate') {
      this.router.navigate(['donate'], {
        queryParams: {
          data: JSON.stringify(data)
        }
      })
    }
    else if(this.type_page == 'pray'){
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
      source_type: 'Parish',
      type_page: this.type_page
    }
    this.router.navigate(['/parishes'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
    this.closeModal();
  }
}
