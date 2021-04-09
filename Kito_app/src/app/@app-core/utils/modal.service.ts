import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Injectable()
export class ModalService {

  constructor(
    public modal: ModalController,

  ) { }
    
    async dismiss(data?: any, role?: string, id?: string) {
      await this.modal.dismiss();
    }
}
