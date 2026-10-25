import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BodyType } from '../../interfaces/body-type';
import { Translations } from '../../i18n/translations';

@Component({
  imports: [],
  selector: 'app-body-type-filter',
  styleUrl: './body-type-filter.css',
  templateUrl: './body-type-filter.html',
})
export class BodyTypeFilter {
  // Received from the parent
  @Input({ required: true }) t!: Translations;
  @Input() selected: BodyType | null = null;          // null = all types
  @Input() counts: Record<BodyType, number> = { suv: 0, sedan: 0, hatchback: 0 };
  @Input() total = 0;

  // Sent to the parent when the user picks a type (null = all)
  @Output() typeChange = new EventEmitter<BodyType | null>();

  types: BodyType[] = ['suv', 'sedan', 'hatchback'];

  select(type: BodyType | null) {
    this.typeChange.emit(type);
  }
}
