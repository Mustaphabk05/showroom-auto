import { SortOption } from '../interfaces/sort-option';
import { BodyType } from '../interfaces/body-type';

export type Lang = 'en' | 'fr' | 'ar';

// Every text of the website, in one place.
// Functions are used when a text contains a number or a name.
export interface Translations {
  dir: 'ltr' | 'rtl';
  title: string;
  subtitle: string;
  languageLabel: string;
  lightsOff: string;
  lightsOn: string;

  search: string;
  searchPlaceholder: string;

  price: string;
  minPrice: string;
  maxPrice: string;
  minPlaceholder: string;
  maxPlaceholder: string;
  priceError: string;
  currency: string;
  formatPrice: (price: number) => string;
  powerUnit: string;

  sortBy: string;
  sort: Record<SortOption, string>;

  bodyTypeLabel: string;
  allTypes: string;
  bodyTypes: Record<BodyType, string>;

  results: (shown: number, total: number) => string;
  resetFilters: string;
  noResults: string;

  power: string;
  stockLabel: string;
  inStock: (count: number) => string;
  onlyLeft: (count: number) => string;
  soldOut: string;
  soldStamp: string;

  viewDetails: string;
  closeDetails: string;
  whatsappButton: string;
  whatsappMessage: (carName: string, price: string) => string;
  englishOnlyNote: string;

  footerVisit: string;
  footerHours: string;
  footerContact: string;
  hoursWeek: string;
  hoursTime: string;
  hoursSunday: string;
  rights: string;
}

export const TRANSLATIONS: Record<Lang, Translations> = {
  en: {
    dir: 'ltr',
    title: 'Luxury cars, ready for the road',
    subtitle: 'Browse the cars we have in stock and open any of them for the full description.',
    languageLabel: 'Language',
    lightsOff: 'Lights off',
    lightsOn: 'Lights on',

    search: 'Search',
    searchPlaceholder: 'Brand or model, e.g. Range Rover',

    price: 'Price',
    minPrice: 'Minimum price',
    maxPrice: 'Maximum price',
    minPlaceholder: 'Min',
    maxPlaceholder: 'Max',
    priceError: 'The minimum is higher than the maximum.',
    currency: 'DT',
    formatPrice: price => `${price.toLocaleString('en-US')} DT`,
    powerUnit: 'CV',

    sortBy: 'Sort by',
    sort: {
      'default': 'Default order',
      'price-asc': 'Price: low to high',
      'price-desc': 'Price: high to low',
      'power-desc': 'Most powerful',
      'name-asc': 'Name: A to Z',
    },

    bodyTypeLabel: 'Body type',
    allTypes: 'All',
    bodyTypes: { suv: 'SUV', sedan: 'Sedan', hatchback: 'Hatchback' },

    results: (shown, total) => `${shown} of ${total} cars`,
    resetFilters: 'Reset filters',
    noResults: 'No cars match these filters. Change them or reset them above.',

    power: 'Fiscal power',
    stockLabel: 'In stock',
    inStock: count => `${count} in stock`,
    onlyLeft: count => `Only ${count} left`,
    soldOut: 'Sold out',
    soldStamp: 'Sold',

    viewDetails: 'View details',
    closeDetails: 'Close details',
    whatsappButton: 'Ask about this car on WhatsApp',
    whatsappMessage: (carName, price) =>
      `Hello, I'm interested in the ${carName} at ${price}. Is it still available?`,
    englishOnlyNote: '',

    footerVisit: 'Visit us',
    footerHours: 'Opening hours',
    footerContact: 'Contact',
    hoursWeek: 'Mon – Sat:',
    hoursTime: '9:00 – 19:00',
    hoursSunday: 'Sunday: closed',
    rights: 'All rights reserved.',
  },

  fr: {
    dir: 'ltr',
    title: 'Des voitures de prestige, prêtes à prendre la route',
    subtitle: 'Parcourez les voitures en stock et ouvrez-en une pour voir sa description complète.',
    languageLabel: 'Langue',
    lightsOff: 'Éteindre',
    lightsOn: 'Allumer',

    search: 'Rechercher',
    searchPlaceholder: 'Marque ou modèle, ex. Range Rover',

    price: 'Prix',
    minPrice: 'Prix minimum',
    maxPrice: 'Prix maximum',
    minPlaceholder: 'Min',
    maxPlaceholder: 'Max',
    priceError: 'Le minimum est supérieur au maximum.',
    currency: 'DT',
    formatPrice: price => `${price.toLocaleString('fr-FR')} DT`,
    powerUnit: 'CV',

    sortBy: 'Trier par',
    sort: {
      'default': 'Ordre par défaut',
      'price-asc': 'Prix croissant',
      'price-desc': 'Prix décroissant',
      'power-desc': 'Les plus puissantes',
      'name-asc': 'Nom : A à Z',
    },

    bodyTypeLabel: 'Carrosserie',
    allTypes: 'Toutes',
    bodyTypes: { suv: 'SUV', sedan: 'Berline', hatchback: 'Compacte' },

    results: (shown, total) => `${shown} sur ${total} voitures`,
    resetFilters: 'Réinitialiser les filtres',
    noResults: 'Aucune voiture ne correspond à ces filtres. Modifiez-les ou réinitialisez-les plus haut.',

    power: 'Puissance fiscale',
    stockLabel: 'En stock',
    inStock: count => `${count} en stock`,
    onlyLeft: count => `Plus que ${count} en stock`,
    soldOut: 'Épuisé',
    soldStamp: 'Vendu',

    viewDetails: 'Voir les détails',
    closeDetails: 'Fermer',
    whatsappButton: 'Demander sur WhatsApp',
    whatsappMessage: (carName, price) =>
      `Bonjour, je suis intéressé(e) par la ${carName} à ${price}. Est-elle toujours disponible ?`,
    englishOnlyNote: 'Description disponible en anglais uniquement.',

    footerVisit: 'Nous trouver',
    footerHours: 'Horaires',
    footerContact: 'Contact',
    hoursWeek: 'Lun – sam :',
    hoursTime: '9 h – 19 h',
    hoursSunday: 'Dimanche : fermé',
    rights: 'Tous droits réservés.',
  },

  ar: {
    dir: 'rtl',
    title: 'سيارات فاخرة جاهزة للطريق',
    subtitle: 'تصفح السيارات المتوفرة لدينا وافتح أي واحدة لرؤية وصفها الكامل.',
    languageLabel: 'اللغة',
    lightsOff: 'إطفاء الأضواء',
    lightsOn: 'تشغيل الأضواء',

    search: 'بحث',
    searchPlaceholder: 'الماركة أو الطراز بالأحرف اللاتينية، مثلا Range Rover',

    price: 'السعر',
    minPrice: 'أدنى سعر',
    maxPrice: 'أعلى سعر',
    minPlaceholder: 'من',
    maxPlaceholder: 'إلى',
    priceError: 'الحد الأدنى أكبر من الحد الأقصى.',
    currency: 'د.ت',
    formatPrice: price => `${price.toLocaleString('en-US')} د.ت`,
    powerUnit: 'حصان',

    sortBy: 'ترتيب حسب',
    sort: {
      'default': 'الترتيب الافتراضي',
      'price-asc': 'السعر: من الأقل إلى الأعلى',
      'price-desc': 'السعر: من الأعلى إلى الأقل',
      'power-desc': 'الأقوى',
      'name-asc': 'الاسم: من A إلى Z',
    },

    bodyTypeLabel: 'نوع الهيكل',
    allTypes: 'الكل',
    bodyTypes: { suv: 'رباعية الدفع', sedan: 'سيدان', hatchback: 'هاتشباك' },

    results: (shown, total) => `${shown} من ${total} سيارة`,
    resetFilters: 'إعادة ضبط الفلاتر',
    noResults: 'لا توجد سيارة تطابق هذه الفلاتر. غيّرها أو أعد ضبطها في الأعلى.',

    power: 'القوة الجبائية',
    stockLabel: 'المخزون',
    inStock: count => `${count} في المخزون`,
    onlyLeft: count => `بقي ${count} فقط`,
    soldOut: 'نفدت الكمية',
    soldStamp: 'مباع',

    viewDetails: 'عرض التفاصيل',
    closeDetails: 'إغلاق',
    whatsappButton: 'اسأل عن هذه السيارة عبر واتساب',
    whatsappMessage: (carName, price) =>
      `مرحبا، أنا مهتم بسيارة ${carName} بسعر ${price}. هل ما زالت متوفرة؟`,
    englishOnlyNote: 'الوصف متوفر باللغة الإنجليزية فقط.',

    footerVisit: 'زورونا',
    footerHours: 'أوقات العمل',
    footerContact: 'اتصل بنا',
    hoursWeek: 'من الاثنين إلى السبت:',
    hoursTime: '9:00 – 19:00',
    hoursSunday: 'الأحد: مغلق',
    rights: 'جميع الحقوق محفوظة.',
  },
};
