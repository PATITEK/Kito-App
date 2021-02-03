import { Component, OnInit } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { AccountService } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/utils';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {

  constructor(private camera: Camera, private accountService: AccountService, private loadingService: LoadingService) { }
  image_url = '';
  ngOnInit() {}
  uploadAvatar(){
    this.loadingService.present();
    const options = {
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    }
    this.camera.getPicture(options).then(async (dataUrl) => {
      if (dataUrl) {
        var dataUri = "data:image/jpeg;base64," + dataUrl;
        var image = this.dataURItoBlob(dataUri);
        // console.log(image)
        let formData = new FormData;
        formData.append('files[]', image);
          this.accountService.uploadPhoto(formData).subscribe((data)=>{
            // console.log(data)
            this.image_url = data['data'][0];
            localStorage.setItem('img_url', this.image_url);
            this.loadingService.dismiss();
          })
      }
    }).catch(() => {
      setTimeout(() => {
      }, 500);
    })
  }

  takephoto() {
    this.loadingService.present();
    const options = {
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true
    }
    this.camera.getPicture(options).then(async (dataUrl) => {

      if (dataUrl) {
        var dataUri = "data:image/jpeg;base64," + dataUrl;
        var image = this.dataURItoBlob(dataUri);
        let formData = new FormData;
        formData.append('files[]', image);
        this.accountService.uploadPhoto(formData).subscribe((data)=>{
          // console.log(data)
          this.image_url = data['data'][0];
          localStorage.setItem('img_url', this.image_url);
          this.loadingService.dismiss();
        })
      }
    }).catch(() => {
      setTimeout(() => {
        
      }, 500);
    })
  }
  dataURItoBlob(dataURI) {
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    }
    else {
      byteString = encodeURI(dataURI.split(',')[1]);
    }
  
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  }
}
