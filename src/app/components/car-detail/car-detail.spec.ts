import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarDetail } from './car-detail';
import { TRANSLATIONS } from '../../i18n/translations';
import { AUTOS } from '../../data/autos';

describe('CarDetail', () => {
  let component: CarDetail;
  let fixture: ComponentFixture<CarDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(CarDetail);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('t', TRANSLATIONS.en);
    fixture.componentRef.setInput('whatsappNumber', '21600000000');
    fixture.componentRef.setInput('auto', AUTOS[0]);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit closed when the close button is clicked', () => {
    let wasClosed = false;
    component.closed.subscribe(() => (wasClosed = true));
    fixture.nativeElement.querySelector('.close').click();
    expect(wasClosed).toBe(true);
  });

  it('should build a WhatsApp link with the car name in the message', () => {
    expect(component.whatsappLink).toContain('https://wa.me/');
    expect(decodeURIComponent(component.whatsappLink)).toContain('Mercedes-Benz C-Class');
  });
});
