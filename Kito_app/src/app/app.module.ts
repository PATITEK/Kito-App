import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './@app-core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './@app-core/auth-guard.service';
import { Camera } from '@ionic-native/camera/ngx';
import { SlideService } from './@modular/slide/slide.service';
import { Stripe } from '@ionic-native/stripe/ngx';
import {enableProdMode} from '@angular/core';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    CoreModule.forRoot(),
    FormsModule, 
    ReactiveFormsModule,
   
  ],
  providers: [
    StatusBar,
    SlideService,
    Stripe,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthGuard,
    Camera,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
