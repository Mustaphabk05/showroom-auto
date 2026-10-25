import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Translations } from '../../i18n/translations';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-search-bar',
  styleUrl: './search-bar.css',
  templateUrl: './search-bar.html',
})
export class SearchBar {
  faMagnifyingGlass = faMagnifyingGlass;

  // Received from the parent: the texts in the current language
  @Input({ required: true }) t!: Translations;

  // Received from the parent: the text to show in the box
  // (so the parent can empty it with "Reset filters")
  @Input() term = '';

  // Sent to the parent every time the user types
  @Output() termChange = new EventEmitter<string>();

  onType(value: string) {
    this.termChange.emit(value);
  }
}
