import { Component, OnInit, ViewChild } from '@angular/core';
import { Howl } from 'howler'
import { IonRange } from '@ionic/angular';
import { SongService } from 'src/app/@app-core/http/song';

enum RepeatingType {
  None,
  RepeatOne,
  RepeatAll
}
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
  playlist = [];
  shuffledList = [];
  shuffledLikedList = [];

  activeTrack = null;
  player: Howl = null;
  progress = 0;
  progressInterval = null;
  hasModal = false;
  mixed = false;
  repeatingType: RepeatingType = RepeatingType.RepeatAll;

  constructor(
    private songService: SongService
  ) {

    this.playlist = [
      {
        id: 0,
        name: 'Hãy thắp sáng lên',
        author: 'Phan Đình Tùng',
        path: 'https://res.cloudinary.com/baodang359/video/upload/v1615538818/kito-music/soundtrack1_tgqm5n.mp3',
        liked: true,
        thumbImage: 'https://cdn.searchenginejournal.com/wp-content/uploads/2019/08/c573bf41-6a7c-4927-845c-4ca0260aad6b-760x400.jpeg',
        lyrics: [
          'Này bạn hỡi hãy thắp sáng lên',
          'Này bạn hỡi hãy thắp sáng lên',
          'Này bạn hỡi hãy thắp sáng lên',
          'Này bạn hỡi hãy thắp sáng lên',
          'Này bạn hỡi hãy thắp sáng lên',
          'Này bạn hỡi hãy thắp sáng lên',
          'Này bạn hỡi hãy thắp sáng lên',
          'Này bạn hỡi hãy thắp sáng lên',
          'Này bạn hỡi hãy thắp sáng lên',
          'Này bạn hỡi hãy thắp sáng lên',
          'Này bạn hỡi hãy thắp sáng lên',
          'Này bạn hỡi hãy thắp sáng lên',
        ]
      },
      {
        id: 1,
        name: 'Con chỉ là tạo vật',
        author: 'Tâm Đoan',
        path: 'https://res.cloudinary.com/baodang359/video/upload/v1615538818/kito-music/soundtrack1_tgqm5n.mp3',
        liked: false,
        thumbImage: 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y',
        lyrics: [
          'Này bạn hỡi hãy thắp sáng lên',
          'Này bạn hỡi hãy thắp sáng lên',
          'Này bạn hỡi hãy thắp sáng lên',
          'Này bạn hỡi hãy thắp sáng lên',
          'Này bạn hỡi hãy thắp sáng lên',
          'Này bạn hỡi hãy thắp sáng lên',
          'Này bạn hỡi hãy thắp sáng lên',
        ]
      },
      {
        id: 2,
        name: 'Hoan Ca Maria',
        author: 'Hoàng Nhung',
        path: 'https://res.cloudinary.com/baodang359/video/upload/v1615538818/kito-music/soundtrack1_tgqm5n.mp3',
        liked: true,
        thumbImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
        lyrics: [
          'Này bạn hỡi hãy thắp sáng lên',
          'Này bạn hỡi hãy thắp sáng lên',
          'Này bạn hỡi hãy thắp sáng lên',
          'Này bạn hỡi hãy thắp sáng lên',
          'Này bạn hỡi hãy thắp sáng lên',
          'Này bạn hỡi hãy thắp sáng lên',
          'Này bạn hỡi hãy thắp sáng lên',
          'Này bạn hỡi hãy thắp sáng lên',
          'Này bạn hỡi hãy thắp sáng lên',
          'Này bạn hỡi hãy thắp sáng lên',
          'Này bạn hỡi hãy thắp sáng lên',
          'Này bạn hỡi hãy thắp sáng lên',
          'Này bạn hỡi hãy thắp sáng lên',
          'Này bạn hỡi hãy thắp sáng lên',
        ]
      },
    ]
  }

  ngOnInit() {
    this.reInitShuffledList();
    this.reInitShuffledLikedList();
    this.songService.getAllSongs().subscribe(data => {
    })
  }

  ngOnDestroy() {
    clearInterval(this.progressInterval);
    this.player && this.player.unload();
  }
  ionViewWillEnter() {
      this.songService.getAllSongs().subscribe(data => {
      })
  }

  reInitShuffledList() {
    this.shuffledList = this.shuffleArr(this.playlist);
  }

  reInitShuffledLikedList() {
    this.shuffledLikedList = this.shuffleArr(this.playlist.filter(track => track.liked));
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
        this.updateProgress();
      },
      onend: () => {
        this.onEndTrack();
      }
    });
    this.player.play();
  }

  onEndTrack() {
    switch (this.repeatingType) {
      case RepeatingType.RepeatOne:
        this.player.play();
        break;
      case RepeatingType.RepeatAll:
        this.next();
        break;
    }
  }

  togglePlayer = () => {
    if (this.player.playing()) {
      this.player.pause();
    } else {
      this.player.play();
    }
  }

  toggleLike(track) {
    event.stopPropagation();
    track.liked = !track.liked;
    this.reInitShuffledLikedList();
  }

  toggleHasModal(bool) {
    this.hasModal = bool;
  }

  toggleMixed() {
    this.mixed = !this.mixed;
  }

  changeRepeatingType() {
    if (this.repeatingType === RepeatingType.RepeatAll) {
      this.repeatingType = RepeatingType.RepeatOne;
    } else if (this.repeatingType === RepeatingType.RepeatOne) {
      this.repeatingType = RepeatingType.None;
    } else if (this.repeatingType === RepeatingType.None) {
      this.repeatingType = RepeatingType.RepeatAll;
    }
  }

  checkNoneRepeating() {
    return this.repeatingType === RepeatingType.None;
  }

  checkRepeatingOne() {
    return this.repeatingType === RepeatingType.RepeatOne;
  }

  getCurrentListAndIndex() {
    let list = [];
    let index = null;
    if (this.mixed) {
      list = this.segmentValue === 'all' ? this.shuffledList : this.shuffledLikedList;
      index = list.indexOf(this.activeTrack);
      if (index === -1) {
        list = this.shuffledList;
        index = list.indexOf(this.activeTrack);
      }
    } else {
      list = this.segmentValue === 'all' ? this.playlist : this.playlist.filter(track => track.liked);
      index = list.indexOf(this.activeTrack);
      if (index === -1) {
        list = this.playlist;
        index = list.indexOf(this.activeTrack);
      }
    }
    return { list: list, index: index };
  }

  next = () => {
    const { list, index } = this.getCurrentListAndIndex();
    if (index === list.length - 1) {
      this.start(list[0]);
    } else {
      this.start(list[index + 1]);
    }
  }

  prev = () => {
    const { list, index } = this.getCurrentListAndIndex();
    if (index > 0) {
      this.start(list[index - 1]);
    } else {
      this.start(list[list.length - 1]);
    }
  }

  seek = () => {
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

  checkActiveTrack(track) {
    return this.activeTrack && track.id === this.activeTrack.id;
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
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + ':' : "";
    var mDisplay = m > 0 ? m + ':' : "0:";
    var sDisplay = s > 0 ? s + '' : "0";
    return hDisplay + mDisplay + sDisplay;
  }
}
