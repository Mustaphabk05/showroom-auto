import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Luxury cars, ready for the road');
  });

  it('should search in brand and model', () => {
    const app = TestBed.createComponent(App).componentInstance;
    app.onSearch('range');
    expect(app.filteredAutos.map(a => a.model)).toEqual(['Range Rover Evoque', 'Range Rover']);
  });

  it('should combine search and price instead of replacing one with the other', () => {
    const app = TestBed.createComponent(App).componentInstance;
    app.onSearch('audi');
    app.onPriceChange({ min: 200000, max: null });
    expect(app.filteredAutos.map(a => a.model)).toEqual(['Q3 Sportback', 'Q5']);
  });

  it('should sort by price without changing the original list', () => {
    const app = TestBed.createComponent(App).componentInstance;
    app.onSortChange('price-asc');
    expect(app.filteredAutos[0].model).toBe('A3 Sportback');
    expect(app.autoList[0].model).toBe('C-Class');
  });

  it('should filter by body type and combine it with the search', () => {
    const app = TestBed.createComponent(App).componentInstance;
    app.onTypeChange('sedan');
    expect(app.filteredAutos.map(a => a.model)).toEqual(['C-Class', 'Giulia']);
    app.onSearch('alfa');
    expect(app.filteredAutos.map(a => a.model)).toEqual(['Giulia']);
  });

  it('should count body types among the cars matching the other filters', () => {
    const app = TestBed.createComponent(App).componentInstance;
    expect(app.typeCounts).toEqual({ suv: 13, sedan: 2, hatchback: 1 });
    app.onSearch('audi');
    expect(app.typeCounts).toEqual({ suv: 2, sedan: 0, hatchback: 1 });
  });

  it('should reset every filter', () => {
    const app = TestBed.createComponent(App).componentInstance;
    app.onSearch('bmw');
    app.onPriceChange({ min: 300000, max: 400000 });
    app.onSortChange('price-desc');
    app.onTypeChange('suv');
    app.resetFilters();
    expect(app.filteredAutos.length).toBe(16);
    expect(app.hasActiveFilters).toBe(false);
  });

  it('should switch to Arabic and right-to-left', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.componentInstance.changeLanguage('ar');
    await fixture.whenStable();
    const shell = (fixture.nativeElement as HTMLElement).querySelector('.shell')!;
    expect(shell.getAttribute('dir')).toBe('rtl');
    expect(shell.getAttribute('lang')).toBe('ar');
  });

  it('should turn the lights off and on', async () => {
    const fixture = TestBed.createComponent(App);
    const shell = () => (fixture.nativeElement as HTMLElement).querySelector('.shell')!;
    fixture.componentInstance.toggleNight();
    await fixture.whenStable();
    expect(shell().classList).toContain('night');
    fixture.componentInstance.toggleNight();
    await fixture.whenStable();
    expect(shell().classList).not.toContain('night');
  });
});
