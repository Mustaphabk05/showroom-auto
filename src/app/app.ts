import { Component } from '@angular/core';
import { HeadBar } from './components/head-bar/head-bar';
import { SearchBar } from './components/search-bar/search-bar';
import { PriceFilter } from './components/price-filter/price-filter';
import { SortSelect } from './components/sort-select/sort-select';
import { BodyTypeFilter } from './components/body-type-filter/body-type-filter';
import { CarCard } from './components/car-card/car-card';
import { CarDetail } from './components/car-detail/car-detail';
import { Footer } from './components/footer/footer';
import { Auto } from './interfaces/auto';
import { PriceRange } from './interfaces/price-range';
import { SortOption } from './interfaces/sort-option';
import { BodyType } from './interfaces/body-type';
import { Showroom } from './interfaces/showroom';
import { AUTOS } from './data/autos';
import { SHOWROOM } from './data/showroom';
import { Lang, TRANSLATIONS, Translations } from './i18n/translations';

/**
 * Parent component: it owns all the data and every filter value.
 * Children receive values through @Input() and send changes back through @Output().
 *
 *   App ──[t][lang][night][showroomName]──▶ HeadBar ──(langChange)(nightToggle)──▶ App
 *   App ──[term]──────────────▶ SearchBar   ──(termChange)──▶ App
 *   App ──[min][max]──────────▶ PriceFilter ──(priceChange)─▶ App
 *   App ──[sortBy]────────────▶ SortSelect  ──(sortChange)──▶ App
 *   App ──[selected][counts]──▶ BodyTypeFilter ──(typeChange)──▶ App
 *   App ──[auto]──────────────▶ CarCard     ──(viewDetails)─▶ App
 *   App ──[auto][whatsappNumber]▶ CarDetail ──(closed)──────▶ App
 *   App ──[t][showroom]───────▶ Footer
 *
 * Every child also receives [t], the texts in the current language.
 * Language, direction and night mode are applied by the parent's own template
 * (on the .shell wrapper), so no child and no service touches the page directly.
 *
 * Every filter goes through ONE method, applyFilters(), so the filters
 * combine instead of overwriting each other.
 */
@Component({
  imports: [HeadBar, SearchBar, PriceFilter, SortSelect, BodyTypeFilter, CarCard, CarDetail, Footer],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  // Language and lights
  lang: Lang = 'en';
  t: Translations = TRANSLATIONS.en;
  night = false;

  showroom: Showroom = SHOWROOM;
  whatsappNumber = SHOWROOM.whatsappNumber;

  autoList: Auto[] = AUTOS;
  filteredAutos: Auto[] = AUTOS;
  selectedCar: Auto | null = null;

  // Current filter values (the children display these values)
  searchTerm = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  sortBy: SortOption = 'default';
  selectedType: BodyType | null = null; // null = all types

  // How many cars of each type match the OTHER filters (shown on the chips)
  typeCounts: Record<BodyType, number> = this.countTypes(AUTOS);
  typeTotal = AUTOS.length;

  // Cheapest and most expensive car, shown as hints in the price filter
  lowestPrice = Math.min(...AUTOS.map(auto => auto.price));
  highestPrice = Math.max(...AUTOS.map(auto => auto.price));

  // ---- Language and lights (from HeadBar) ----

  changeLanguage(lang: Lang) {
    this.lang = lang;
    this.t = TRANSLATIONS[lang];
  }

  toggleNight() {
    this.night = !this.night;
  }

  // ---- Handlers for the filter children's outputs ----

  onSearch(term: string) {
    this.searchTerm = term;
    this.applyFilters();
  }

  onPriceChange(range: PriceRange) {
    this.minPrice = range.min;
    this.maxPrice = range.max;
    this.applyFilters();
  }

  onSortChange(sort: SortOption) {
    this.sortBy = sort;
    this.applyFilters();
  }

  onTypeChange(type: BodyType | null) {
    this.selectedType = type;
    this.applyFilters();
  }

  resetFilters() {
    this.searchTerm = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.sortBy = 'default';
    this.selectedType = null;
    this.applyFilters();
  }

  get hasActiveFilters(): boolean {
    return (
      this.searchTerm.trim() !== '' ||
      this.minPrice !== null ||
      this.maxPrice !== null ||
      this.sortBy !== 'default' ||
      this.selectedType !== null
    );
  }

  // ---- The single place where filtering and sorting happen ----

  applyFilters() {
    const query = this.searchTerm.trim().toLowerCase();

    // 1. Search and price
    const matching = this.autoList.filter(auto => {
      // Search in brand AND model, anywhere in the text: "range", "bmw x3", "q5"...
      const name = `${auto.brand} ${auto.model}`.toLowerCase();
      const matchesName = query === '' || name.includes(query);

      const matchesMin = this.minPrice === null || auto.price >= this.minPrice;
      const matchesMax = this.maxPrice === null || auto.price <= this.maxPrice;

      return matchesName && matchesMin && matchesMax;
    });

    // 2. Count each body type among those cars, for the numbers on the chips
    this.typeCounts = this.countTypes(matching);
    this.typeTotal = matching.length;

    // 3. Body type
    const result = this.selectedType === null
      ? matching
      : matching.filter(auto => auto.bodyType === this.selectedType);

    // 4. Sort
    this.filteredAutos = this.sortCars(result);
  }

  private countTypes(cars: Auto[]): Record<BodyType, number> {
    const counts: Record<BodyType, number> = { suv: 0, sedan: 0, hatchback: 0 };
    for (const car of cars) {
      counts[car.bodyType]++;
    }
    return counts;
  }

  private sortCars(cars: Auto[]): Auto[] {
    // sort() changes the array it is called on, so we sort a copy
    const copy = [...cars];

    switch (this.sortBy) {
      case 'price-asc':
        return copy.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return copy.sort((a, b) => b.price - a.price);
      case 'power-desc':
        return copy.sort((a, b) => b.power - a.power);
      case 'name-asc':
        return copy.sort((a, b) =>
          `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`)
        );
      default:
        return copy; // original order
    }
  }

  // ---- Details panel ----

  openDetails(auto: Auto) {
    this.selectedCar = auto;
  }

  closeDetails() {
    this.selectedCar = null;
  }
}
