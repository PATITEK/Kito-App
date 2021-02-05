import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { IPageRequest, MatchUsersService } from 'src/app/@app-core/http';
import { DateTimeService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
})
export class PeoplePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  users = [];
  pageRequest: IPageRequest = {
    page: 1,
    per_page: 9
  }

  constructor(
    public dateTimeService: DateTimeService,
    private matchUsersService: MatchUsersService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(func?) {
    this.matchUsersService.getAll(this.pageRequest).subscribe(data => {
      data.app_users.forEach((d, i) => {
        if (i % 3 == 0) {
          this.users.push([d]);
        } else {
          this.users[this.users.length - 1].push(d);
        }
      })

      func && func();
      this.pageRequest.page++;

      if (this.getUsersLength() >= data.meta.pagination.total_objects && this.infiniteScroll) {
        this.infiniteScroll.disabled = true;
      }
    })
  }

  getUsersLength() {
    return this.users.reduce((acc, cur) => acc + cur.length, 0);
  }

  getDateString() {
    return this.dateTimeService.getDateString(new Date());
  }

  doRefresh(event) {
    // reset
    this.users = [];
    this.pageRequest.page = 1;
    if (this.infiniteScroll) {
      this.infiniteScroll.disabled = false;
    }

    this.getData(() => {
      event.target.complete();
    })
  }

  loadMoreData(event) {
    this.getData(() => {
      event.target.complete();
    });
  }
}
