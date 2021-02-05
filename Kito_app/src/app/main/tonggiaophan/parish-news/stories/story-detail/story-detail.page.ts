import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.page.html',
  styleUrls: ['./story-detail.page.scss'],
})
export class StoryDetailPage implements OnInit {
  @ViewChild('searchBar') searchBar: any;
  hiddenSearchBar = true;
  constructor() { }

  ngOnInit() {
  }
  toggleHideSearchBar(value) {
    event.stopPropagation();
    this.hiddenSearchBar = value;
    if (!value) {
      this.searchBar.setFocus();
    }
  }
}
