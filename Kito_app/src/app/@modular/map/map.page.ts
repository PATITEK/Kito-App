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
  location = new google.maps.LatLng(10.810327, 106.668205);

  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;
  constructor(
    public platform: Platform,
    private loadingService: LoadingService,
    private GeolocationService: GeolocationService
  ) { }

  GetYourLocation() {
    this.GeolocationService.getCurrentLocation();
  }

  ngOnInit(){
    this.GeolocationService.getCurrentLocation();
  }

  ngAfterViewInit() {
    // this.showMap();
    this.initMap();
  }

  
  

  // ionViewDidEnter() {
  //   this.showMap();
  // }

  // showMap(location?) {
  //   Environment.setEnv({
  //     'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyBH-sWHs1mfptQLcfd-UgRWwExsVQ45vAk',
  //     'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyBH-sWHs1mfptQLcfd-UgRWwExsVQ45vAk'
  //   });
  //   const options = {
  //     center: this.location || location,
  //     zoom: 16,
  //     // disableDefaultUI: true,
  //   }
  //   this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  // }
  map: google.maps.Map;
  center: google.maps.LatLngLiteral = {lat: 30, lng: -110};

  initMap(): void {
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: this.center,
      zoom: 8
    });
  }
}
