import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EventsService } from 'src/app/@app-core/http';
import { DateTimeService, LoadingService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent implements OnInit {
  @Input() data;

  setEventItemId() {
    localStorage.setItem('eventItemId', this.data.event.id);
  }

  event = {
    id: '',
    name: '',
    description: '',
    start_time: '',
    end_time: '',
    cal_time: '',
    chabad_id: ''
  }
  btnJoinElement;
  disabledBtn = false;
  loadedData = false;

  constructor(
    private router: Router,
    private eventService: EventsService,
    private dateTimeService: DateTimeService,
    public modalController: ModalController,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    // this.loadingService.present();
    this.getData(this.data.event.id);
    this.btnJoinElement = document.querySelectorAll('.btn-join-with-us');
    this.data.event.joined && this.disableButtons();
  }

  disableButtons() {
    this.disabledBtn = true;
    for (let i = 0; i < this.btnJoinElement.length; i++) {
      this.btnJoinElement[i].classList.remove('active-effect');
      this.btnJoinElement[i].classList.add('disabled-btn');
    }
  }

  getData(id) {
    this.eventService.getDetail(id).subscribe(data => {
      this.event = data.event;
      this.loadedData = true;
      // this.loadingService.dismiss();
    })
  }

  goToDonate() {
    this.modalController.dismiss(null, 'cancel');
    const data = {
      type: 'Event',
      chabad: {
        id: this.event.chabad_id
      },
      event: {
        id: this.event.id
      }
    }
    this.router.navigate(['/donate'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }

  getDayString() {
    if (this.event.cal_time == '') {
      return ' ';
    }
    return this.dateTimeService.DAYS[new Date(this.event.cal_time).getDay()].toUpperCase();
  }

  chooseJoinSelection(selection) {
    if (this.disabledBtn) return;

    this.disableButtons();
    if (selection) {
      this.loadingService.present();
      this.setEventItemId();
      this.eventService.joinEvent(this.event).subscribe(() => {
        this.loadingService.dismiss();
      });
    }
  }
}
