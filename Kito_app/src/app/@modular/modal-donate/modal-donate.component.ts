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
    ngOnInit() {
  }
  async closeModal() {
    await this.modalCtrl.dismiss();
  }
  gotoDonate() {
    this.closeModal();
    const data = {
      id: this.diocese_id,
      type: 'Diocese'
    }
    this.router.navigate(['donate'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }
  goToParishes() {
    const data = {
      id: this.diocese_id,
      type: 'Parishes'
    }
    this.authService.sendData(data)
    this.router.navigateByUrl('/parishes')
    // this.router.navigate(['dioceses'], {
    //   queryParams: {
    //     data: JSON.stringify(data)
    //   }
    // })
    this.closeModal();
  }
}
