import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SortSelect } from './sort-select';
import { TRANSLATIONS } from '../../i18n/translations';
import { SortOption } from '../../interfaces/sort-option';

describe('SortSelect', () => {
  let component: SortSelect;
  let fixture: ComponentFixture<SortSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortSelect],
    }).compileComponents();

    fixture = TestBed.createComponent(SortSelect);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('t', TRANSLATIONS.en);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the chosen option', () => {
    let emitted: SortOption | undefined;
    component.sortChange.subscribe(sort => (emitted = sort));
    component.onChange('price-asc');
    expect(emitted).toBe('price-asc');
  });
});
