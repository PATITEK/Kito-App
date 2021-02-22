import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { darkStyle } from './map-dark-style';
import { LoadingService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {
  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;
  data: any = [
    {
      lat: 43.071584, lng: -89.38012, center: true
    },
    {
      lat: 43.074395, lng: -89.381056
    },
    {
      lat: 43.07336, lng: -89.38335
    }
  ]

  constructor(
    private ModalCrtl: ModalController,
    public http: HttpClient,
    @Inject(DOCUMENT) private doc: Document,
    public platform: Platform,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadingService.present();
    setTimeout(() => {
      this.initMap();
      this.loadingService.dismiss();
    }, 3000);
  }

  load(): any {
    if (this.data) {
      return of(this.data);
    } else {
      return this.http
        .get('/app/app_users/profile')
        .pipe(map(this.processData, this));
    }
  }

  processData(data: any) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking speakers to sessions
    this.data = data;

    // loop through each day in the schedule
    this.data.schedule.forEach((day: any) => {
      // loop through each timeline group in the day
      day.groups.forEach((group: any) => {
        // loop through each session in the timeline group
        group.sessions.forEach((session: any) => {
          session.speakers = [];
          if (session.speakerNames) {
            session.speakerNames.forEach((speakerName: any) => {
              const speaker = this.data.speakers.find(
                (s: any) => s.name === speakerName
              );
              if (speaker) {
                session.speakers.push(speaker);
                speaker.sessions = speaker.sessions || [];
                speaker.sessions.push(session);
              }
            });
          }
        });
      });
    });

    return this.data;
  }

  getMap() {
    return this.load().pipe(
      map((data: any) => {
        return data.map;
      })
    );
  }

  dismiss() {
    this.ModalCrtl.dismiss();
  }

  async initMap() {
    console.log('hello')
    const appEl = this.doc.querySelector('ion-app');
    let isDark = false;
    let style = [];
    if (appEl.classList.contains('dark-theme')) {
      style = darkStyle;
    }

    const googleMaps = await getGoogleMaps(
      'AIzaSyBH-sWHs1mfptQLcfd-UgRWwExsVQ45vAk'
    );

    let map;

    this.getMap().subscribe((mapData: any) => {
      mapData = this.data;
      console.log(mapData)
      const mapEle = this.mapElement.nativeElement;

      map = new googleMaps.Map(mapEle, {
        // center: mapData.find((d: any) => d.center),
        zoom: 16,
        styles: style
      });
      mapData.forEach((markerData: any) => {
        const infoWindow = new googleMaps.InfoWindow({
          content: `<h5>${markerData.name}</h5>`
        });

        const marker = new googleMaps.Marker({
          position: markerData,
          map,
          title: markerData.name
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });

      googleMaps.event.addListenerOnce(map, 'idle', () => {
        mapEle.classList.add('show-map');
      });
    });

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const el = mutation.target as HTMLElement;
          isDark = el.classList.contains('dark-theme');
          if (map && isDark) {
            map.setOptions({ styles: darkStyle });
          } else if (map) {
            map.setOptions({ styles: [] });
          }
        }
      });
    });
    observer.observe(appEl, {
      attributes: true
    });
  }
}

function getGoogleMaps(apiKey: string): Promise<any> {
  const win = window as any;
  const googleModule = win.google;
  if (googleModule && googleModule.maps) {
    return Promise.resolve(googleModule.maps);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.31`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = () => {
      const googleModule2 = win.google;
      if (googleModule2 && googleModule2.maps) {
        resolve(googleModule2.maps);
      } else {
        reject('google maps not available');
      }
    };
  });
}
