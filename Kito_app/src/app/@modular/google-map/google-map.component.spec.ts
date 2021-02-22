import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

<<<<<<< HEAD:Kito_app/src/app/parishes/parishes.page.spec.ts
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
=======
import { GoogleMapComponent } from './google-map.component';

describe('GoogleMapComponent', () => {
  let component: GoogleMapComponent;
  let fixture: ComponentFixture<GoogleMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleMapComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GoogleMapComponent);
>>>>>>> d9e2c9dbdb4fa6d9ac613ef27603ff0d2644479f:Kito_app/src/app/@modular/google-map/google-map.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
