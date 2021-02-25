import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GeolocationService } from 'src/app/@app-core/utils';
import { ParishesService } from 'src/app/@app-core/http/parishes';
import { IPageParishes } from 'src/app/@app-core/http/parishes/parishes.DTO';
import { DioceseService } from 'src/app/@app-core/http/diocese';
import { IPageRequest } from 'src/app/@app-core/http/global/global.DTO';
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map: google.maps.Map;

  center: google.maps.LatLngLiteral = this.GeolocationService.centerService;

  infoWindows: any = [];

  pageRequestParishes: IPageParishes = {
    diocese_id: 0,
  }

  pageRequestDioceses: IPageRequest = {

  }

  markers: any = []

  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;
  constructor(
    public platform: Platform,
    private GeolocationService: GeolocationService,
    private parishesService: ParishesService,
    private diocesesService: DioceseService,
    private geolocationService: GeolocationService,
  ) { }

  ngOnInit() {
    this.GeolocationService.getCurrentLocation();
    this.diocesesService.getAll(this.pageRequestDioceses).subscribe(data => {
      let totalDioceses = data.meta.pagination.per_page;
      for (let i = 1; i <= totalDioceses; i++) {
        this.pageRequestParishes.diocese_id += 1;
        this.parishesService.getAll(this.pageRequestParishes).subscribe(data => {
          this.markers = data.parishes;
          this.addMarkersToMap(this.markers);
        })
      }
    })
  }

  ionViewDidEnter() {
    this.center = this.GeolocationService.centerService;
    this.initMap();
  }

  ngAfterViewInit() {
  }

  initMap(): void {
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: this.center,
      zoom: 15,
      disableDefaultUI: true,
    });
    this.addMarkersToMap(this.markers);
  }

  getCurrentLocation() {
    this.GeolocationService.getCurrentLocation();
    this.center = this.GeolocationService.centerService;
    this.initMap();
    this.getCurrenMarker();
  }

  getCurrenMarker() {
    let currentMarker = new google.maps.Marker({
      position: new google.maps.LatLng(this.center.lat, this.center.lng),
      label: 'Vị trí của bạn, kéo thả để thay đổi',
      icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      draggable: true,
    });
    currentMarker.setMap(this.map);
    this.getCurrentMarkerLatLng(currentMarker, this.center.lat, this.center.lng);
  }

  getCurrentMarkerLatLng(currentMarker, lat, lng) {
    google.maps.event.addListener(currentMarker, 'dragend', function (event) {
      lat = event.latLng.lat();
      lng = event.latLng.lng();
    });
  }

  addMarkersToMap(markers) {
    for (let marker of markers) {
      let distance = this.geolocationService.distanceFromUserToPoint(this.center.lat, this.center.lng, marker.location.lat, marker.location.long);
      let position = new google.maps.LatLng(marker.location.lat, marker.location.long);
      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.name,
        label: marker.name,
        icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
      });
      let mapMarkerInfo = {
        lat: marker.location.lat,
        lng: marker.location.long,
        name: marker.priest_name,
        address: marker.address,
        thumb_image: marker.thumb_image.url,
        distance: distance,
      }

      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker, mapMarkerInfo);
    }
  }

  async addInfoWindowToMarker(marker, mapMarkerInfo) {
    let infoWindowContent = '<div *ngIf=" markers.length != null ">' +
      '<h3 style=" display: block; text-align: center; ">' + marker.title + '</h3>' +
      '<img style=" height: 100px; width: 100%; display: block; border-radius: 12px; " src=' + mapMarkerInfo.thumb_image + '>' +
      '<h5 style=" display: block; text-align: center; ">' + mapMarkerInfo.name + '</h5>' +
      '<h5>' + mapMarkerInfo.address + '</h5>' +
      '<p>Khoảng cách ước tính: ' + mapMarkerInfo.distance + ' km</p>' +
      '<p>Latitude: ' + mapMarkerInfo.lat + '</p>' +
      '<p>Longitude: ' + mapMarkerInfo.lng + '</p>' +
      '<ion-button id="navigate" style=" --background: #F6C33E; --border-radius: 10px; display: block; ">' + 'Chỉ đường tới đây' + '</ion-button>'
    '</div>';
    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent,
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);

      google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
        document.getElementById('navigate').addEventListener('click', () => {
          window.open('https://www.google.com/maps/dir/?api=1&destination=' + mapMarkerInfo.lat + ',' + mapMarkerInfo.lng);
        });
      });

    });
    this.infoWindows.push(infoWindow);
  }

  closeAllInfoWindows() {
    for (let window of this.infoWindows) {
      window.close();
    }
  }
}
