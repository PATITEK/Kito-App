import { LoadingService } from './../../@app-core/utils/loading.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Howl } from 'howler'
import { IonRange } from '@ionic/angular';

export interface Track {
  name: string;
  author: string;
  path: string;
}

@Component({
  selector: 'app-hymn-music',
  templateUrl: './hymn-music.page.html',
  styleUrls: ['./hymn-music.page.scss'],
})
export class HymnMusicPage implements OnInit {
  headerCustom = { title: 'Nhạc Thánh ca' };
  segmentValue = 'all';

  playlist: Track[] = [
    {
      name: 'ccccxss',
      author: 'aasxxasxax',
      path: 'http://res.cloudinary.com/dtj7y1r0l/video/upload/v1458851262/msgSound_x2laav.mp3'
    },
    {
      name: 'kikikik',
      author: 'hghghghg',
      path: '../../../assets/img/questionares/audios/soundtrack1.mp3'
    },
    {
      name: 'sfsfssdaad',
      author: '5w5rwres',
      path: '../../../assets/img/questionares/audios/soundtrack1.mp3'
    }
  ]

  activeTrack: Track = null;
  player: Howl = null;
  isPlaying = false;
  progress = 0;
  @ViewChild('range', { static: false }) range: IonRange;

  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
  }

  ionViewWillLeave() {
    if(this.isPlaying) {
      this.togglePlayer(this.isPlaying);
    }
  }

  changedSegment(event) {
    this.segmentValue = event.target.value;
  }

  start(track: Track) {
    this.loadingService.present();
    if(this.player) {
      this.player.stop();
    }
    this.player = new Howl({
      src: [track.path],
      html5: true,
      onplay: () => {
        console.log('onplay')
        this.isPlaying = true;
        this.activeTrack = track;
        this.updateProgress();
      },
      onend: () => {
        this.next();
        console.log('onend')
      }
    });
    this.player.play();
    this.loadingService.dismiss();
  }

  togglePlayer(pause) {
    this.isPlaying = !pause;
    if(pause) {
      this.player.pause();
    } else {
      this.player.play();
    }
  }

  next() {
    let index = this.playlist.indexOf(this.activeTrack);
    if (index != this.playlist.length - 1) {
      this.start(this.playlist[index+1]);
    } else {
      this.start(this.playlist[0]);
    }
  }

  prev() {
    let index = this.playlist.indexOf(this.activeTrack);
    if (index > 0) {
      this.start(this.playlist[index-1]);
    } else {
      this.start(this.playlist[this.playlist.length - 1]);
    }
  }

  seek() {
    let newValue = +this.range.value;
    let duration = this.player.duration();
    this.player.seek(duration * (newValue / 100));
  }

  updateProgress() {
    let seek = this.player.seek();
    this.progress = (<any>seek / this.player.duration()) *100 || 0;
    setTimeout(() => {
      this.updateProgress();
    }, 1000)
  }

}
