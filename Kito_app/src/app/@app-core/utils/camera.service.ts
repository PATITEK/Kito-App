import { Injectable } from '@angular/core';
import { LoadingService, ToastService } from 'src/app/@app-core/utils';
import { Camera } from '@ionic-native/camera/ngx';
import { AccountService } from '../http';
import { PopoverController } from '@ionic/angular';
import { PopoverimageComponent } from '../../@modular/popoverimage/popoverimage.component';

@Injectable()
export class CameraService {

    image_null: any;

    constructor(
        public camera: Camera,
        public loadingService: LoadingService,
        public accountService: AccountService,
        public popoverController: PopoverController,
        public toastService: ToastService

    ) { }
    public getAvatarUpload(image_avatar) {
        this.loadingService.present('Chờ trong giây lát...');
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
                    localStorage.setItem('avatar', image_avatar.app_user.avatar)
                    this.accountService.updateAvatar({ "thumb_image": { "url": image_avatar.app_user.avatar } }).subscribe(data => {
                    })
                    this.loadingService.dismiss();
                    this.accountService.getAccounts().subscribe();
                    this.toastService.present('Cập nhật ảnh thành công !', 'top', 2000);
                })
            } else {
            }
        }).catch((err) => {
            console.error(err)
            this.loadingService.dismiss();
            this.toastService.present('Xảy ra lỗi, vui lòng thử lại sau !', 'top', 2000);
        })
    }
    public getAvatarTake(image_avatar) {
        this.loadingService.present('Chờ trong giây lát...');
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
                    image_avatar = {
                        "app_user": {
                            "avatar": data['data'][0]
                        }
                    }
                    localStorage.setItem('avatar', image_avatar.app_user.avatar)
                    this.accountService.updateAvatar({ "thumb_image": { "url": image_avatar.app_user.avatar } }).subscribe(data => {
                    })
                    this.loadingService.dismiss();
                    this.accountService.getAccounts().subscribe();
                    this.toastService.present('Cập nhật ảnh thành công !', 'top', 2000);
                })
            } else {
            }
        }).catch((err) => {
            console.error(err)
            this.loadingService.dismiss();
            this.toastService.present('Xảy ra lỗi, vui lòng thử lại sau !', 'top', 2000);

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

    async viewAvatar() {
        this.loadingService.present();
        const popoverImage = await this.popoverController.create({
            component: PopoverimageComponent,
            cssClass: 'image_popover_css',
            translucent: true,
            mode: 'md'
        });
        return await popoverImage.present();
    }

    removeAvatar() {
        if (localStorage.getItem('avatar') == 'https://i.imgur.com/edwXSJa.png') {
            this.toastService.present('Bạn chưa có ảnh đại diện', 'top');
        }
        else {
            this.loadingService.present();
            this.image_null = {
                "thumb_image": {
                    "url": null
                }
            }
            this.accountService.updateAvatar(this.image_null).subscribe(
                (data: any) => {
                    localStorage.setItem('avatar', 'https://i.imgur.com/edwXSJa.png')
                    this.loadingService.dismiss();
                    this.toastService.present('Xóa ảnh thành công !', 'top', 2000);
                },
                (data: any) => {
                    this.loadingService.dismiss();
                    if (data.error) {
                        this.toastService.present('Lỗi rồi !', 'top', 2000);
                    }
                }
            )
        }
    }
}