import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DoctrineService, LOADING } from 'src/app/@app-core/http';
import { LoadingService, ToastService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-modal-res',
  templateUrl: './modal-res.component.html',
  styleUrls: ['./modal-res.component.scss'],
})
export class ModalResComponent implements OnInit {

  @Input() id: any;
  @Input() type: any;
  constructor(private modalCtrl: ModalController,
    private doctrineService: DoctrineService,
    private loadingService: LoadingService,
    private toarstService: ToastService
    ) { }

  ngOnInit() {
  }
  async dismissModal() {
    await this.modalCtrl.dismiss();
  }
  register() {
    this.loadingService.present()
    let data = {
      "register_detail": {
        "doctrine_class_id": this.id
      }
    }
    this.doctrineService.register(data).subscribe((data) => {
      this.toarstService.presentSuccess();
    })
  }
  unregister() {
    this.loadingService.present();
    let data = {
      "register_detail": {
        "doctrine_class_id": this.id
      }
    }
    this.doctrineService.unregister(data).subscribe((data) => {
      this.toarstService.presentSuccess();
    })
  }
  submit(){
    if(this.type === true)
    {
      this.register();
    }
    else{
      this.unregister();
    }
    this.dismissModal();
  }
}
