import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hymn-video',
  templateUrl: './hymn-video.page.html',
  styleUrls: ['./hymn-video.page.scss'],
})
export class HymnVideoPage implements OnInit {
  headerCustom = { title: 'Video bài giảng' };
  constructor() { }

  datas= [
    {
      thumb_img: 'https://hdgmvietnam.com/Admin/Upload/Image/peter-and-paul-st.jpg',
      avatar: 'https://hdgmvietnam.com/Admin/Upload/Image/peter-and-paul-st.jpg',
      title: 'Những sai lầm khi cầu nguyện',
      sub_title: 'Giáo Hội Công Giáo',
      views: '1000',
      time: '17:15  03.02.2021'
    },
    {
      thumb_img: 'https://2.bp.blogspot.com/-hhEVNDoN318/Wo4Zu0UcdPI/AAAAAAAAMGA/k7nrBreMFGwbApbYxv2EizYjVS8TYaC_wCLcBGAs/s1600/FB_IMG_1519220705942.jpg',
      avatar: 'https://hdgmvietnam.com/Admin/Upload/Image/peter-and-paul-st.jpg',
      title: 'Những sai lầm khi cầu nguyện',
      sub_title: 'Giáo Hội Công Giáo',
      views: '1000',
      time: '17:15  03.02.2021'
    },
    {
      thumb_img: 'https://hdgmvietnam.com/Admin/Upload/Image/peter-and-paul-st.jpg',
      avatar: 'https://hdgmvietnam.com/Admin/Upload/Image/peter-and-paul-st.jpg',
      title: 'Những sai lầm khi cầu nguyện',
      sub_title: 'Giáo Hội Công Giáo',
      views: '1000',
      time: '17:15  03.02.2021'
    }
  ]

  ngOnInit() {
  }

  goToYoutube() {
    
  }

}
