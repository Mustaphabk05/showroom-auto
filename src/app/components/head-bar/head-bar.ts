import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLightbulb, faMoon } from '@fortawesome/free-solid-svg-icons';
import { Lang, Translations } from '../../i18n/translations';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-head-bar',
  styleUrl: './head-bar.css',
  templateUrl: './head-bar.html',
})
export class HeadBar {
  faMoon = faMoon;
  faLightbulb = faLightbulb;

  // Received from the parent
  @Input({ required: true }) t!: Translations;
  @Input() lang: Lang = 'en';
  @Input() night = false;
  @Input() showroomName = '';

  // Sent to the parent
  @Output() langChange = new EventEmitter<Lang>();
  @Output() nightToggle = new EventEmitter<void>();

  languages: { code: Lang; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'ar', label: 'عربي' },
  ];

  selectLanguage(code: Lang) {
    this.langChange.emit(code);
  }

  onToggleNight() {
    this.nightToggle.emit();
  }
}
