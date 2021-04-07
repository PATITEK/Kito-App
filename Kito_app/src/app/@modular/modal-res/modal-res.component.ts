import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DoctrineService, LOADING } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/utils';

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
    private loadingService: LoadingService,) { }

  ngOnInit() {
    

  }
  async dismissModal() {
    await this.modalCtrl.dismiss();
  }
  register() {
    this.loadingService.present(LOADING.REGIEST)
    let data = {
      "register_detail": {
        "doctrine_class_id": this.id
      }
    }
    this.doctrineService.register(data).subscribe((data) => {
      this.loadingService.dismiss();
    })

  }
  unregister() {
    this.loadingService.present(LOADING.UNREGIEST);
    let data = {
      "register_detail": {
        "doctrine_class_id": this.id
      }
    }
    this.doctrineService.unregister(data).subscribe((data) => {
      this.loadingService.dismiss();
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
