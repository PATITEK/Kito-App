import { Injectable } from '@angular/core';
import { LoadingService } from 'src/app/@app-core/utils';
import { Camera } from '@ionic-native/camera/ngx';
import { AccountService } from '../http';

@Injectable()
export class CameraService {

    constructor(
        public camera: Camera,
        public loadingService: LoadingService,
        public accountService: AccountService,
    ) { }

    public getAvatarUpload(image_avatar) {
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
                let formData = new FormData;
                formData.append('files[]', image);
                this.accountService.uploadPhoto(formData).subscribe((data) => {
                    image_avatar = {
                        "app_user": {
                            "avatar": data['data'][0]
                        }
                    }
                    this.accountService.updateAvatar({"thumb_image" : {"url": image_avatar.app_user.avatar}}).subscribe(data => {
                    })
                    this.loadingService.dismiss();
                },)
            } else {
            }
        }).catch(() => {
            this.loadingService.dismiss();
        })
    }
    public getAvatarTake(image_avatar) {
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
                this.accountService.uploadPhoto(formData).subscribe((data) => {
                    console.log(data)
                    image_avatar = {
                        "app_user": {
                            "avatar": data['data'][0]
                        }
                    }
                    this.accountService.updateAvatar({"thumb_image" : {"url": image_avatar.app_user.avatar}}).subscribe(data => {
                    })
                    this.loadingService.dismiss();
                },)
            } else {
            }
        }).catch(() => {
            this.loadingService.dismiss();
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