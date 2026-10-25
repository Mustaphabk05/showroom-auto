import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodyTypeFilter } from './body-type-filter';
import { TRANSLATIONS } from '../../i18n/translations';
import { BodyType } from '../../interfaces/body-type';

describe('BodyTypeFilter', () => {
  let component: BodyTypeFilter;
  let fixture: ComponentFixture<BodyTypeFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyTypeFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(BodyTypeFilter);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('t', TRANSLATIONS.en);
    fixture.componentRef.setInput('counts', { suv: 13, sedan: 0, hatchback: 1 });
    fixture.componentRef.setInput('total', 14);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the clicked type', () => {
    let emitted: BodyType | null | undefined;
    component.typeChange.subscribe(type => (emitted = type));
    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[1].click(); // SUV
    expect(emitted).toBe('suv');
  });

  it('should disable a type with no matching cars', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons[2].disabled).toBe(true); // Sedan, count 0
  });
});
