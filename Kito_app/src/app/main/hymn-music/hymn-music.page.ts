import { HymnMusicService } from './../../@app-core/http/hymn-music/hymn-music.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Howl } from 'howler'
import { IonInfiniteScroll, IonRange, IonContent, ModalController } from '@ionic/angular';
import { LoadingService } from 'src/app/@app-core/utils';
import { IPageRequest } from 'src/app/@app-core/http';
import { ComfillerComponent } from 'src/app/@modular/comfiller/comfiller.component';
import { IHymnMusic } from 'src/app/@app-core/http/hymn-music/hymn-music.DTO';

@Component({
  selector: 'app-hymn-music',
  templateUrl: './hymn-music.page.html',
  styleUrls: ['./hymn-music.page.scss'],
})
export class HymnMusicPage implements OnInit {
  @ViewChild('range', { static: false }) range: IonRange;
  @ViewChild('infiniteScrollSongs', {static: false}) infinityScroll: IonInfiniteScroll;
  @ViewChild(IonContent) ionContent: IonContent;
  
  headerCustom = { title: 'Nhạc Thánh ca' };
  segmentValue = 'all';
  selectFiller = "all";
  selectSort = "asc";
  songs = [];
  favoriteSongs = [];
  shuffledSongs = [];
  shuffledFavoriteSongs = [];

  activeSong = null;
  activeLyric = null;
  player: Howl = null;
  progress = 0;
  progressInterval = null;
  hasModal = false;
  hDisplay: any;
  mDisplay: any;
  mixed = false;
  notFound = false;
  REPEATING_TYPE = {
    NONE: 0,
    REPEAT_ONE: 1,
    REPEAT_ALL: 2
  }
  repeatingType = this.REPEATING_TYPE.REPEAT_ALL;
  pageRequestSongs: IHymnMusic = {
    page: 1,
    per_page: 16,
    filter: "",
    filter_type: "asc"
  }
  pageRequestFavoriteSongs: IHymnMusic = {
    page: 1,
    filter: "",
    filter_type: "asc"
  }

  loadedSong = false;
  notFoundSong = false;
  constructor(
    private hymnMusicService: HymnMusicService,
    private loadingService: LoadingService,
    private modalCtrl: ModalController
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
      delete this.pageRequestSongs.search;
      delete this.pageRequestFavoriteSongs.search
    }
    else {
      this.pageRequestSongs.search = value;
      this.pageRequestFavoriteSongs.search = value;
    }
    this.pageRequestSongs.page = 1;
    this.pageRequestFavoriteSongs.page = 1;
    this.songs = [];
    this.favoriteSongs = [];
    this.getData();
    this.infinityScroll.disabled = false;
    this.ionContent.scrollToTop(0);
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

    this.hDisplay = h > 0 ? h : '';
    var mDisplay = m > 0 ? m : '';
    mDisplay = mDisplay > 9 ? mDisplay : '0' + mDisplay + ':';
    var sDisplay = s > 0 ? s : '';
    sDisplay = sDisplay > 9 ? sDisplay : '0' + sDisplay;
    return this.hDisplay + mDisplay + sDisplay;
  }

  shuffleSongs() {
    this.shuffledSongs = this.shuffleArr(this.songs);
  }

  shuffleFavoriteSongs() {
    this.shuffledFavoriteSongs = this.shuffleArr(this.favoriteSongs);
  }

  getSongs(func?) {
    this.notFound = false;
    this.hymnMusicService.getAll(this.pageRequestSongs).subscribe(data => {
      this.notFound = true;
      this.songs = [];
      this.songs = this.songs.concat(data.songs);
      this.pageRequestSongs.page++;
      func && func();
      if (this.songs.length >= data.meta.pagination.total_objects) {
        this.infinityScroll.disabled = true;
        this.loadedSong = true;
      }
      this.shuffleSongs();
      console.log(data);
      console.log(this.infinityScroll.disabled);
      this.loadingService.dismiss();
    })
  }

  getFavoriteSongs() {
    this.notFoundSong = false;
    this.favoriteSongs = [];
    this.hymnMusicService.getAllFavorite(this.pageRequestFavoriteSongs).subscribe(data => {
      this.notFoundSong = true;
      this.favoriteSongs = this.songs.concat(data.songs);
      this.shuffleFavoriteSongs();
    })
  }

  getData() {
    this.getSongs();
    this.getFavoriteSongs();
  }

  changedSegment(event) {
    this.segmentValue = event.target.value;
    this.infinityScroll.complete();
    if (this.checkAllSegment()) {
      if (!this.loadedSong) {
        this.infinityScroll.disabled = false;
      }
    } else {
      this.infinityScroll.disabled = true;
    }
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
    event.stopPropagation();
    if (this.checkAllSegment()) {
      if (song.favourite) {
        this.hymnMusicService.unfavorite(song.id).subscribe(() => {
          song.favourite = !song.favourite;
          this.favoriteSongs = this.favoriteSongs.filter(favoriteSong => favoriteSong.id !== song.id);
          this.loadingService.dismiss();
        })
      } else {
        this.shuffleFavoriteSongs();
        this.hymnMusicService.favorite(song.id).subscribe(() => {
          song.favourite = !song.favourite;
          this.favoriteSongs.push(song);
          this.loadingService.dismiss();
        });
      }
    } else {
      this.hymnMusicService.unfavorite(song.id).subscribe(() => {
        this.favoriteSongs = this.favoriteSongs.filter(favoriteSong => favoriteSong.id !== song.id);
      });
    }
  }

  toggleHasModal(bool) {
    this.hasModal = bool;
    this.hymnMusicService.getDetail(this.activeSong.id).subscribe((data: any) => {
      this.activeLyric = data.song.lyric;
    })
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

  loadMoreSongs(event) {
    if (this.checkAllSegment()) {
      this.getSongs(() => {
        event.target.complete();
      });
    }
  }

  async clickFiller() {
    const popover = await this.modalCtrl.create({
      component: ComfillerComponent,
      swipeToClose: true,
      cssClass: 'modalFiller',
      componentProps: {
        fillerItem: this.selectFiller,
        sortItem: this.selectSort
      }
    });
    popover.onDidDismiss()
      .then(async (data) => {



        if (data.data?.filler) {
          this.selectFiller = data.data.filler;

          if (data.data.filler == "all") {
            this.pageRequestSongs.filter = "";
          }
          else {
            this.pageRequestSongs.filter = data.data.filler;
          }


        }
        if (data.data?.sort) {
          this.selectSort = data.data.sort;
          this.pageRequestSongs.filter_type = data.data.sort;
        }
        this.getData();
      });

    return await popover.present();
  }
}
