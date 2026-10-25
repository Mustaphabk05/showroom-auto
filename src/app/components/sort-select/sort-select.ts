import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SortOption } from '../../interfaces/sort-option';
import { Translations } from '../../i18n/translations';

@Component({
  imports: [],
  selector: 'app-sort-select',
  styleUrl: './sort-select.css',
  templateUrl: './sort-select.html',
})
export class SortSelect {
  // Received from the parent: the texts in the current language
  @Input({ required: true }) t!: Translations;

  // Received from the parent: the option currently selected
  @Input() sortBy: SortOption = 'default';

  // Sent to the parent when the user picks another option
  @Output() sortChange = new EventEmitter<SortOption>();

  // The labels come from t.sort, in the current language
  options: SortOption[] = ['default', 'price-asc', 'price-desc', 'power-desc', 'name-asc'];

  onChange(value: string) {
    this.sortChange.emit(value as SortOption);
  }
}
