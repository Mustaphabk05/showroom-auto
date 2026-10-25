import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Auto } from '../../interfaces/auto';
import { Translations } from '../../i18n/translations';

@Component({
  imports: [],
  selector: 'app-car-card',
  styleUrl: './car-card.css',
  templateUrl: './car-card.html',
})
export class CarCard {
  // Received from the parent
  @Input({ required: true }) auto!: Auto;
  @Input({ required: true }) t!: Translations;

  // Sent to the parent when the user wants the details
  @Output() viewDetails = new EventEmitter<Auto>();

  get isSold(): boolean {
    return this.auto.availability === 0;
  }

  get isLowStock(): boolean {
    return this.auto.availability > 0 && this.auto.availability <= 3;
  }

  onViewDetails() {
    this.viewDetails.emit(this.auto);
  }
}
