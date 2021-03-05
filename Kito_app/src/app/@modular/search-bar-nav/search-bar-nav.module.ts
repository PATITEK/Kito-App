import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarNavComponent } from './search-bar-nav.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    SearchBarNavComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    SearchBarNavComponent
  ]
})
export class SearchBarNavModule { }
