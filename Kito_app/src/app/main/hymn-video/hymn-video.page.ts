import { LoadingService } from 'src/app/@app-core/utils';
import { HymnMusicService } from './../../@app-core/http/hymn-music/hymn-music.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavController, IonInfiniteScroll, IonContent } from '@ionic/angular';
import { IPageRequest } from 'src/app/@app-core/http';

@Component({
  selector: 'app-hymn-video',
  templateUrl: './hymn-video.page.html',
  styleUrls: ['./hymn-video.page.scss'],
})
export class HymnVideoPage implements OnInit {
  @ViewChild('infiniteScrollVideos') infinityScroll: IonInfiniteScroll;
  @ViewChild(IonContent) ionContent: IonContent;
  headerCustom = { title: 'Video bài giảng' };
  trustedVideoUrlArray: SafeResourceUrl[] = [];
  pageRequestVideos: IPageRequest = {
    page: 1,
    per_page: 4,
  }
  videos = [];

  constructor(
    public navCtrl: NavController,
    private domSanitizer: DomSanitizer,
    private hymnVideoService: HymnMusicService,
    private LoadingService: LoadingService
  ) { }

  ngOnInit() {
    this.LoadingService.present();
    this.getVideos();
  }

  getVideos(func?) {
    this.hymnVideoService.getAllLectureVideo(this.pageRequestVideos).subscribe(data => {
      this.videos = this.videos.concat(data.lecture_videos)
      this.pageRequestVideos.page++;
      func && func();
      if (this.videos.length >= data.meta.pagination.total_objects) {
        this.infinityScroll.disabled = true;
      }
      let tempVideos = this.videos.slice(this.videos.length - 4, this.videos.length);
      for (let video of tempVideos) {
        this.trustedVideoUrlArray.push({
          id: video.id,
          trustLink: this.domSanitizer.bypassSecurityTrustResourceUrl(video.url.replace('watch?v=', 'embed/')),
          title: video.name,

          // avatar: 'https://hdgmvietnam.com/Admin/Upload/Image/peter-and-paul-st.jpg',
          // sub_title: 'Giáo Hội Công Giáo',
          // views: '1000',
          // time: '17:15  03.02.2021'
        })
      }
      setTimeout(() => {
        this.LoadingService.dismiss();
      }, 500)
    })
  }

  loadMoreVideos(event) {
    this.getVideos(() => {
      event.target.complete();
    });
  }

  search(value: string) {
    if (typeof value != 'string') {
      return;
    }
    else if (!value) {
      delete this.pageRequestVideos.search;
    }
    else {
      this.pageRequestVideos.search = value;
    }
    this.pageRequestVideos.page = 1;
    this.videos = [];
    this.getVideos();
    this.infinityScroll.disabled = false;
    this.ionContent.scrollToTop(0);
  }
}
