import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PriceFilter } from './price-filter';
import { TRANSLATIONS } from '../../i18n/translations';
import { PriceRange } from '../../interfaces/price-range';

describe('PriceFilter', () => {
  let component: PriceFilter;
  let fixture: ComponentFixture<PriceFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(PriceFilter);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('t', TRANSLATIONS.en);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit null for an empty box', () => {
    let emitted: PriceRange | undefined;
    component.priceChange.subscribe(range => (emitted = range));
    component.onMinChange('');
    expect(emitted).toEqual({ min: null, max: null });
  });

  it('should emit the typed number and keep the other value', () => {
    let emitted: PriceRange | undefined;
    component.priceChange.subscribe(range => (emitted = range));
    fixture.componentRef.setInput('max', 400);
    component.onMinChange('200');
    expect(emitted).toEqual({ min: 200, max: 400 });
  });

  it('should be invalid when min is higher than max', () => {
    fixture.componentRef.setInput('min', 500);
    fixture.componentRef.setInput('max', 100);
    expect(component.isInvalid).toBe(true);
  });
});
