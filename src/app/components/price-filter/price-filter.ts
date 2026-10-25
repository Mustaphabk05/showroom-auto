import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PriceRange } from '../../interfaces/price-range';
import { Translations } from '../../i18n/translations';

@Component({
  imports: [],
  selector: 'app-price-filter',
  styleUrl: './price-filter.css',
  templateUrl: './price-filter.html',
})
export class PriceFilter {
  // Received from the parent: the texts in the current language
  @Input({ required: true }) t!: Translations;

  // Received from the parent: current values (null = empty box)
  @Input() min: number | null = null;
  @Input() max: number | null = null;

  // Received from the parent: cheapest and most expensive car (limits of the inputs)
  @Input() lowest = 0;
  @Input() highest = 0;

  // Sent to the parent when the user changes one of the two boxes
  @Output() priceChange = new EventEmitter<PriceRange>();

  onMinChange(value: string) {
    this.priceChange.emit({ min: this.toNumber(value), max: this.max });
  }

  onMaxChange(value: string) {
    this.priceChange.emit({ min: this.min, max: this.toNumber(value) });
  }

  get isInvalid(): boolean {
    return this.min !== null && this.max !== null && this.min > this.max;
  }

  // An empty box means "no limit"
  private toNumber(value: string): number | null {
    return value === '' ? null : Number(value);
  }
}
