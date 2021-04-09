import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/@app-core/utils/modal.service';

@Component({
  selector: 'app-popuplogout',
  templateUrl: './popuplogout.component.html',
  styleUrls: ['./popuplogout.component.scss'],
})
export class PopuplogoutComponent implements OnInit {

  constructor(  
    public modal: ModalService,
    private router: Router) { }

  ngOnInit() {}
    dismissModal() {
      this.modal.dismiss(null, 'cancel',null);
    }
    logout() {
      this.modal.dismiss(null, 'cancel',null);
      localStorage.clear();
      this.router.navigate(['auth-manager/login']);
    }
}
