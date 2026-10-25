import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { Auto } from '../../interfaces/auto';
import { Translations } from '../../i18n/translations';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-car-detail',
  styleUrl: './car-detail.css',
  templateUrl: './car-detail.html',
})
export class CarDetail implements AfterViewInit {
  faCommentDots = faCommentDots;

  // Received from the parent
  @Input({ required: true }) auto!: Auto;
  @Input({ required: true }) t!: Translations;
  @Input({ required: true }) whatsappNumber!: string;

  // Sent to the parent when the user closes the panel
  @Output() closed = new EventEmitter<void>();

  @ViewChild('closeButton') closeButton!: ElementRef<HTMLButtonElement>;

  // Link that opens WhatsApp with a message already written, in the current language
  get whatsappLink(): string {
    const carName = `${this.auto.brand} ${this.auto.model}`;
    const price = this.t.formatPrice(this.auto.price);
    const message = this.t.whatsappMessage(carName, price);
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  // Put keyboard focus on the close button when the panel opens
  ngAfterViewInit() {
    this.closeButton.nativeElement.focus();
  }

  // Escape key closes the panel
  @HostListener('document:keydown.escape')
  onEscape() {
    this.close();
  }

  // Clicking the dark background (not the panel itself) closes it
  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  close() {
    this.closed.emit();
  }
}
