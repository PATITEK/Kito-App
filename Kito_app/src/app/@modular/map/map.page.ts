import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GeolocationService } from 'src/app/@app-core/utils';
import { ParishesService } from 'src/app/@app-core/http/parishes';
import { IPageParishes } from 'src/app/@app-core/http/parishes/parishes.DTO';
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map: google.maps.Map;

  center: google.maps.LatLngLiteral = this.GeolocationService.centerService;

  labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  infoWindows: any = []

  id_diocese = 1;

  pageRequestParishes: IPageParishes = {
    diocese_id: this.id_diocese,
    page: 1,
    per_page: 359000,
  }

  markers: any = []

  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;
  constructor(
    public platform: Platform,
    private GeolocationService: GeolocationService,
    private parishes: ParishesService
  ) { }

  ngOnInit(){
    this.GeolocationService.getCurrentLocation();
    this.parishes.getAll(this.pageRequestParishes).subscribe(data=> {
      this.markers = data.parishes;
      console.log('parish', this.markers)
      this.addMarkersToMap(this.markers);
    })
  }

  ionViewDidEnter() {
    this.center = this.GeolocationService.centerService;
    this.initMap(this.center);
  }

  ngAfterViewInit() {
  }

  getYourLocation() {
    this.GeolocationService.getCurrentLocation();
    this.center = this.GeolocationService.centerService;
    this.initMap(this.center);
  }
  
  initMap(center): void {
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: this.center || center,
      zoom: 15,
      // disableDefaultUI: true,
    });
    this.addMarkersToMap(this.markers);
  }

  addMarkersToMap(markers) {
    for (let marker of markers) {
      let position = new google.maps.LatLng(marker.location.lat, marker.location.long);
      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.name,
      });
      let mapMarkerInfo = {
        lat: marker.location.lat,
        lng: marker.location.long,
        name: marker.priest_name,
        address: marker.address,
        thumb_image: marker.thumb_image.url,
      }

      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker, mapMarkerInfo);
    }
  }

  addInfoWindowToMarker(marker, mapMarkerInfo) {
    let infoWindowContent = '<div *ngIf=" markers.length != null ">' +
                              '<h3 style=" display: block; text-align: center; ">' + marker.title + '</h3>' +
                              '<img style=" height: 100px; width: 100%; display: block; border-radius: 12px; " src='+ mapMarkerInfo.thumb_image +'>' +
                              '<h5 style=" display: block; text-align: center; ">' + mapMarkerInfo.name + '</h5>' +
                              '<h5>' + mapMarkerInfo.address + '</h5>' +
                              '<p>Latitude: ' + mapMarkerInfo.lat + '</p>' +
                              '<p>Longitude: ' + mapMarkerInfo.lng + '</p>' +
                              '<ion-button id="navigate" style=" --background: #F6C33E; --border-radius: 10px; display: block; ">'+ 'Chỉ đường tới đây' +'</ion-button>'
                            '</div>';
    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent,
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);

      google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
        document.getElementById('navigate').addEventListener('click', () => {
          // code to navigate using google maps app
          window.open('https://www.google.com/maps/dir/?api=1&destination=' + mapMarkerInfo.lat + ',' + mapMarkerInfo.lng);
        });
      });

    });
    this.infoWindows.push(infoWindow);
  }

  closeAllInfoWindows() {
    for(let window of this.infoWindows) {
      window.close();
    }
  }
}
