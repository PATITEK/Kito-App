import { Component, OnInit, ViewChild } from '@angular/core';
import { Howl } from 'howler'
import { IonRange } from '@ionic/angular';
import { listenerCount } from 'node:events';

@Component({
  selector: 'app-hymn-music',
  templateUrl: './hymn-music.page.html',
  styleUrls: ['./hymn-music.page.scss'],
})
export class HymnMusicPage implements OnInit {
  @ViewChild('range', { static: false }) range: IonRange;

  headerCustom = { title: 'Nhạc Thánh ca' };
  segmentValue = 'all';
  playlist = [
    {
      id: 0,
      name: 'Hãy thắp sáng lên',
      author: 'Phan Đình Tùng',
      path: 'http://res.cloudinary.com/dtj7y1r0l/video/upload/v1458851262/msgSound_x2laav.mp3',
      liked: true,
    },
    {
      id: 1,
      name: 'Con chỉ là tạo vật',
      author: 'Tâm Đoan',
      path: '../../../assets/img/questionares/audios/soundtrack1.mp3',
      liked: false,
    },
    {
      id: 2,
      name: 'Hoan Ca Maria',
      author: 'Hoàng Nhung',
      path: '../../../assets/img/questionares/audios/soundtrack1.mp3',
      liked: true,
    },
  ]

  activeTrack = null;
  player: Howl = null;
  isPlaying = false;
  progress = 0;

  constructor() { }

  ngOnInit() {
  }

  ionViewWillLeave() {
    this.player.playing() && this.player.pause();
  }

  changedSegment(event) {
    this.segmentValue = event.target.value;
  }

  start(track) {
    this.activeTrack = track;
    if (this.player) {
      this.player.stop();
    }
    this.player = new Howl({
      src: [track.path],
      html5: true,
      onplay: () => {
        this.isPlaying = true;
        this.updateProgress();
      },
      onend: () => {
        this.next();
      }
    });
    this.player.play();
  }

  togglePlayer() {
    if (this.player.playing()) {
      this.player.pause();
    } else {
      this.player.play();
    }
  }

  toggleLike(track) {
    event.stopPropagation();
    track.liked = !track.liked;
  }

  next() {
    let list = this.segmentValue === 'all' ? this.playlist : this.playlist.filter(track => track.liked);
    let index = list.indexOf(this.activeTrack);
    if (index == -1) {
      list = this.playlist;
      index = list.indexOf(this.activeTrack);
    }
    if (index != list.length - 1) {
      this.start(list[index + 1]);
    } else {
      this.start(list[0]);
    }
  }

  prev() {
    let list = this.segmentValue === 'all' ? this.playlist : this.playlist.filter(track => track.liked);
    let index = list.indexOf(this.activeTrack);
    if (index == -1) {
      list = this.playlist;
      index = list.indexOf(this.activeTrack);
    }
    if (index > 0) {
      this.start(list[index - 1]);
    } else {
      this.start(list[list.length - 1]);
    }
  }

  seek() {
    let newValue = +this.range.value;
    let duration = this.player.duration();
    this.player.seek(duration * (newValue / 100));
  }

  updateProgress() {
    let seek = this.player.seek();
    this.progress = (<any>seek / this.player.duration()) * 100 || 0;
    setTimeout(() => {
      this.updateProgress();
    }, 1000)
  }

  checkActiveTrack(track) {
    return this.activeTrack && track.id === this.activeTrack.id;
  }
}
