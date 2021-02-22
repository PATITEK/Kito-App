import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';


import { ParishesPage } from './parishes.page';

describe('ParishesPage', () => {
  let component: ParishesPage;
  let fixture: ComponentFixture<ParishesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParishesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ParishesPage);

// import { GoogleMapComponent } from './google-map.component';

// describe('GoogleMapComponent', () => {
//   let component: GoogleMapComponent;
//   let fixture: ComponentFixture<GoogleMapComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ GoogleMapComponent ],
//       imports: [IonicModule.forRoot()]
//     }).compileComponents();

//     fixture = TestBed.createComponent(GoogleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
