import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faCommentDots, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Translations } from '../../i18n/translations';
import { Showroom } from '../../interfaces/showroom';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-footer',
  styleUrl: './footer.css',
  templateUrl: './footer.html',
})
export class Footer {
  faLocationDot = faLocationDot;
  faClock = faClock;
  faPhone = faPhone;
  faCommentDots = faCommentDots;

  // Received from the parent (this component only displays, it sends nothing back)
  @Input({ required: true }) t!: Translations;
  @Input({ required: true }) showroom!: Showroom;

  year = new Date().getFullYear();

  // "+216 00 000 000" -> "tel:+21600000000"
  get phoneLink(): string {
    return 'tel:' + this.showroom.phone.replace(/\s/g, '');
  }

  get whatsappLink(): string {
    return `https://wa.me/${this.showroom.whatsappNumber}`;
  }
}
