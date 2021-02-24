import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GeolocationService, LoadingService } from 'src/app/@app-core/utils';
import { ViewChild, ElementRef } from '@angular/core';
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

  markers: any = [
    { lat: 12.704942, lng: 108.062434, title: 'nha tho 0', address: '12 duong 1, tp 1, tinh 3' },
    { lat: 12.704515, lng: 108.062371, title: 'nha tho 1', address: '22 duong 2, tp 2, tinh 3' },
    { lat: 12.703859, lng: 108.063553, title: 'nha tho 2', address: '32 duong 3, tp 2, tinh 3' },
  ];

  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;
  constructor(
    public platform: Platform,
    private loadingService: LoadingService,
    private GeolocationService: GeolocationService
  ) { }

  ngOnInit(){
    this.GeolocationService.getCurrentLocation();
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
      disableDefaultUI: true,
    });
    this.addMarkersToMap(this.markers);
  }

  addMarkersToMap(markers) {
    for (let marker of markers) {
      // console.log(marker.lat)
      let position = new google.maps.LatLng(marker.lat, marker.lng);
      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.title,
      });
      let mapMarkerPosition = {
        lat: marker.lat,
        lng: marker.lng,
        address: marker.address,
      }

      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker, mapMarkerPosition);
    }
  }

  addInfoWindowToMarker(marker, mapMarkerPosition) {
    let infoWindowContent = '<div>' +
                              '<h3>' + marker.title + '</h3>' +
                              '<h5>' + mapMarkerPosition.address + '</h5>' +
                              '<p>Latitude: ' + mapMarkerPosition.lat + '</p>' +
                              '<p>Longitude: ' + mapMarkerPosition.lng + '</p>' +
                              '<ion-button style="--background: #F6C33E ">'+ 'Chỉ đường tới đây' +'</ion-button>'
                            '</div>';

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent,
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
    });
    this.infoWindows.push(infoWindow);
  }

  closeAllInfoWindows() {
    for(let window of this.infoWindows) {
      window.close();
    }
  }
}
