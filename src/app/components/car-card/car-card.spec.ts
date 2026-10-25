import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarCard } from './car-card';
import { TRANSLATIONS } from '../../i18n/translations';
import { AUTOS } from '../../data/autos';

describe('CarCard', () => {
  let component: CarCard;
  let fixture: ComponentFixture<CarCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarCard],
    }).compileComponents();

    fixture = TestBed.createComponent(CarCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('t', TRANSLATIONS.en);
    fixture.componentRef.setInput('auto', AUTOS[0]);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the car when "View details" is clicked', () => {
    let emitted;
    component.viewDetails.subscribe(car => (emitted = car));
    fixture.nativeElement.querySelector('button').click();
    expect(emitted).toBe(AUTOS[0]);
  });

  it('should show the Sold stamp when there is no stock', async () => {
    fixture.componentRef.setInput('auto', { ...AUTOS[0], availability: 0 });
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.stamp')?.textContent).toContain('Sold');
  });
});
