import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-hymn-video',
  templateUrl: './hymn-video.page.html',
  styleUrls: ['./hymn-video.page.scss'],
})
export class HymnVideoPage implements OnInit {
  headerCustom = { title: 'Video bài giảng' };
  trustedVideoUrlArray: SafeResourceUrl[] = [];
  array_of_objects = [
    { vid_link: "https://www.youtube.com/embed/emRXBr5JvoY" },
    { vid_link: "https://www.youtube.com/embed/AavMDUQvt1A" },
    { vid_link: "https://www.youtube.com/embed/U4ogK0MIzqk" }
  ]

  constructor(
    public navCtrl: NavController,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    for (let i of this.array_of_objects) {
      this.trustedVideoUrlArray.push({
        trustLink: this.domSanitizer.bypassSecurityTrustResourceUrl(i.vid_link),
        thumb_img: 'https://2.bp.blogspot.com/-hhEVNDoN318/Wo4Zu0UcdPI/AAAAAAAAMGA/k7nrBreMFGwbApbYxv2EizYjVS8TYaC_wCLcBGAs/s1600/FB_IMG_1519220705942.jpg',
        avatar: 'https://hdgmvietnam.com/Admin/Upload/Image/peter-and-paul-st.jpg',
        title: 'Những sai lầm khi cầu nguyện',
        sub_title: 'Giáo Hội Công Giáo',
        views: '1000',
        time: '17:15  03.02.2021'
      })
    }
  }

  goToYoutube() {

  }
}
