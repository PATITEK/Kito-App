import { HymnMusicService } from './../../@app-core/http/hymn-music/hymn-music.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Howl } from 'howler'
import { IonRange } from '@ionic/angular';
import { LoadingService } from 'src/app/@app-core/utils';
import { IPageRequest } from 'src/app/@app-core/http';

@Component({
  selector: 'app-hymn-music',
  templateUrl: './hymn-music.page.html',
  styleUrls: ['./hymn-music.page.scss'],
})
export class HymnMusicPage implements OnInit {
  @ViewChild('range', { static: false })
  range: IonRange;

  headerCustom = { title: 'Nhạc Thánh ca' };
  segmentValue = 'all';

  songs = [];
  favoriteSongs: any[];
  shuffledSongs = [];
  shuffledFavoriteSongs = [];

  activeSong = null;
  player: Howl = null;
  progress = 0;
  progressInterval = null;
  hasModal = false;

  mixed = false;
  REPEATING_TYPE = {
    NONE: 0,
    REPEAT_ONE: 1,
    REPEAT_ALL: 2
  }
  repeatingType = this.REPEATING_TYPE.REPEAT_ALL;
  pageRequest: IPageRequest = {
    page: 1,
    per_page: 100,
  }

  constructor(
    private hymnMusicService: HymnMusicService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadingService.present();
    this.getData();
  }

  ngOnDestroy() {
    clearInterval(this.progressInterval);
    this.player && this.player.unload();
  }
  search(value: string) {
      if (typeof value != 'string') {
        return;
      }
      else if (!value) {
        delete this.pageRequest.search;
      }
      else {
        this.pageRequest.search = value;
      }
      this.pageRequest.page = 1;
      this.songs = [];
      this.getData();
  }
  shuffleArr(arr) {
    const tempArr = [...arr];
    for (let i = tempArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tempArr[i], tempArr[j]] = [tempArr[j], tempArr[i]];
    }
    return tempArr;
  }

  secondsToHms(d) {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor(d % 3600 / 60);
    const s = Math.floor(d % 3600 % 60);

    const hDisplay = h > 0 ? h + ':' : '';
    const mDisplay = m > 0 ? m + ':' : '0:';
    const sDisplay = s > 0 ? s + '' : '0';
    return hDisplay + mDisplay + sDisplay;
  }

  shuffleSongs() {
    this.shuffledSongs = this.shuffleArr(this.songs);
  }

  shuffleFavoriteSongs() {
    this.shuffledFavoriteSongs = this.shuffleArr(this.favoriteSongs);
  }

  getSongs() {
    this.hymnMusicService.getAll(this.pageRequest).subscribe(data => {
      this.songs = data.songs;
      this.shuffleSongs();
    })
  }

  getFavoriteSongs() {
    this.hymnMusicService.getAllFavorite(this.pageRequest).subscribe(data => {
      this.loadingService.dismiss();
      this.favoriteSongs = data.songs;
      this.shuffleFavoriteSongs();
    })
  }

  getData() {
    this.getSongs();
    this.getFavoriteSongs();
  }
 
  changedSegment(event) {
    this.segmentValue = event.target.value;
  }

  onEndSong() {
    switch (this.repeatingType) {
      case this.REPEATING_TYPE.REPEAT_ONE:
        this.player.play();
        break;
      case this.REPEATING_TYPE.REPEAT_ALL:
        this.next();
        break;
    }
  }

  start(song) {
    this.activeSong = song;
    if (this.player) {
      this.player.stop();
    }
    this.player = new Howl({
      src: [song.url],
      html5: true,
      onplay: () => {
        this.updateProgress();
      },
      onend: () => {
        this.onEndSong();
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

  toggleLike(song) {
    this.loadingService.present();
    event.stopPropagation();
    if (this.checkAllSegment()) {
      if (song.favourite) {
        this.hymnMusicService.unfavorite(song.id).subscribe(() => {
          song.favourite = !song.favourite;
          this.favoriteSongs = this.favoriteSongs.filter(favoriteSong => favoriteSong.id !== song.id);
          this.loadingService.dismiss();
        }, () => {
          this.loadingService.dismiss();
        })
      } else {
        this.shuffleFavoriteSongs();
        this.hymnMusicService.favorite(song.id).subscribe(() => {
          song.favourite = !song.favourite;
          this.favoriteSongs.push(song);
          this.loadingService.dismiss();
        }, () => {
          this.loadingService.dismiss();
        });
      }
    } else {
      this.hymnMusicService.unfavorite(song.id).subscribe(() => {
        this.favoriteSongs = this.favoriteSongs.filter(favoriteSong => favoriteSong.id !== song.id);
        this.loadingService.dismiss();
      }, () => {
        this.loadingService.dismiss();
      });
    }
  }

  toggleHasModal(bool) {
    this.hasModal = bool;
  }

  toggleMixed() {
    this.mixed = !this.mixed;
  }

  changeRepeatingType() {
    switch (this.repeatingType) {
      case this.REPEATING_TYPE.REPEAT_ALL:
        this.repeatingType = this.REPEATING_TYPE.REPEAT_ONE;
        break;
      case this.REPEATING_TYPE.REPEAT_ONE:
        this.repeatingType = this.REPEATING_TYPE.NONE;
        break;
      case this.REPEATING_TYPE.NONE:
        this.repeatingType = this.REPEATING_TYPE.REPEAT_ALL;
        break;
    }
  }

  getCurrentListAndIndex() {
    let list = [];
    let index = null;
    if (this.mixed) {
      list = this.checkAllSegment() ? this.shuffledSongs : this.shuffledFavoriteSongs;
      index = list.indexOf(this.activeSong);
      if (index === -1) {
        list = this.shuffledSongs;
        index = list.indexOf(this.activeSong);
      }
    } else {
      list = this.checkAllSegment() ? this.songs : this.favoriteSongs;
      index = list.indexOf(this.activeSong);
      if (index === -1) {
        list = this.songs;
        index = list.indexOf(this.activeSong);
      }
    }
    return { list: list, index: index };
  }

  next() {
    const { list, index } = this.getCurrentListAndIndex();
    this.start(index === list.length - 1 ? list[0] : list[index + 1]);
  }

  prev() {
    const { list, index } = this.getCurrentListAndIndex();
    this.start(index > 0 ? list[index - 1] : list[list.length - 1])
  }

  seek() {
    let newValue = +this.range.value;
    let duration = this.player.duration();
    this.player.seek(duration * (newValue / 100));
  }

  updateProgress() {
    clearInterval(this.progressInterval);
    this.progressInterval = setInterval(() => {
      const seek = this.player.seek();
      this.progress = (<any>seek / this.player.duration()) * 100 || 0;
    }, 1000)
  }

  checkActiveSong(song) {
    return this.activeSong && song.id === this.activeSong.id;
  }

  checkAllSegment() {
    return this.segmentValue === 'all';
  }
}
