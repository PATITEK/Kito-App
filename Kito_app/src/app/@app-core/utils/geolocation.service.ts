import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { LoadingService } from './loading.service';
import { Platform } from '@ionic/angular';

interface Location {
    lat: number;
    lng: number;
    address: string;
}

@Injectable()

export class GeolocationService {

    // lat: any = 0;
    // lng: any = 0;

    geoEncoderOptions: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
    };

    customerLocation: Location = {
        lat: 0,
        lng: 0,
        address: "null"
    };

    centerService: google.maps.LatLngLiteral = {lat: 10.847949, lng: 106.786794};

    constructor(public geolocation: Geolocation,
        public nativeGeocoder: NativeGeocoder,
        public loadingService: LoadingService,
        public PlatForm: Platform,
        ) {}

    ngOnInit() {}

    //only use this method
    getCurrentLocation() {
        this.PlatForm.ready().then(() => {
            this.loadingService.present('Hãy đợi trong giây lát...');
            this.geolocation.getCurrentPosition().then((resp) => {
                // this.lat = resp.coords.latitude;
                // this.lng = resp.coords.longitude;
                this.centerService.lat = resp.coords.latitude;
                this.centerService.lng = resp.coords.longitude;
                this.getGeoEncoder(this.centerService.lat, this.centerService.lng);
                // console.log(this.lat,'  ', this.lng)
                this.loadingService.dismiss();
            })
            .catch((err) => {
                this.loadingService.dismiss();
                console.error(err);
            })
        })
    }

    getGeoEncoder(latitude, longitude) {
        this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoEncoderOptions)
        .then((result: NativeGeocoderResult[]) => {
            // console.log('result', result)
            this.customerLocation.address = this.generateAddress(result[0]);
            localStorage.setItem('location', this.customerLocation.address);
            console.log(this.customerLocation.address);
        })
        .catch((err: any) => {
            console.error(err,': because chay tren dien thoai real moi dc =))');
        });
    }

    generateAddress(addressObj) {
        let obj = [];
        let address = "";
        for (let key in addressObj) {
          obj.push(addressObj[key]);
        }
        obj.reverse();
        for (let val in obj) {
          if (obj[val].length)
            address += obj[val] + ', ';
        }
        return address.slice(0, -2);
        // return address;
    }

    distanceFromUserToPoint(lat1: number, lng1: number, lat2: number, lng2: number) {
        //count distance from user to their church, church's lat & long given by BE to count
        const R = 6371000;
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lng2 - lng1) * (Math.PI / 180);
        const la1ToRad = lat1 * (Math.PI / 180);
        const la2ToRad = lat2 * (Math.PI / 180);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(la1ToRad) * Math.cos(la2ToRad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return Math.round(d/1000);
    }
}