import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBar } from './search-bar';
import { TRANSLATIONS } from '../../i18n/translations';

describe('SearchBar', () => {
  let component: SearchBar;
  let fixture: ComponentFixture<SearchBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBar],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBar);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('t', TRANSLATIONS.en);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
