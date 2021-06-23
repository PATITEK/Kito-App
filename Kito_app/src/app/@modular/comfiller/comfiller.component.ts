import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-comfiller',
  templateUrl: './comfiller.component.html',
  styleUrls: ['./comfiller.component.scss'],
})
export class ComfillerComponent implements OnInit {
  listFiller = [
    {
      id: 1,
      name: "Tất cả",
      icon: "assets/img/music/allmusic.svg"
    },
    {
      id: 2,
      name: "Bài hát",
      icon: "assets/img/music/song.svg"
    },
    {
      id: 3,
      name: "Nghệ sĩ",
      icon: "assets/img/music/artist.svg"
    },
    {
      id: 4,
      name: "Thể loại",
      icon: "assets/img/music/category.svg"
    }
  ]
  listSort = [{
    id: 1,
    name: "Tên (A-Z)",
    icon: "assets/img/music/az.svg"
  },
  {
    id: 2,
    name: "Tên (Z-A)",
    icon: "assets/img/music/za.svg"
  },
  ]
  activeFiller;
  activeSort;
  @Input() fillerItem;
  @Input() sortItem;
  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.activeFiller = this.fillerItem;
    this.activeSort = this.sortItem;
  }
  selectFiller(item) {
    this.activeFiller = item.id;

    console.log(this.activeFiller);

    this.modalCtrl.dismiss({
      filler: this.activeFiller
    });
  }
  selectSort(item) {


    this.activeSort = item.id;

    this.modalCtrl.dismiss({
      sort: this.activeSort
    });
  }
}
