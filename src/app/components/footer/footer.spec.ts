import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Footer } from './footer';
import { TRANSLATIONS } from '../../i18n/translations';
import { SHOWROOM } from '../../data/showroom';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('t', TRANSLATIONS.en);
    fixture.componentRef.setInput('showroom', SHOWROOM);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the showroom name and a phone link without spaces', () => {
    expect(fixture.nativeElement.textContent).toContain('Auto Prestige Tunis');
    expect(component.phoneLink).toBe('tel:+21600000000');
  });
});
