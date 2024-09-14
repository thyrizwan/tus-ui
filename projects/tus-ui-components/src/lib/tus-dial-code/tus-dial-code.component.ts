import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { Country } from '../class/country';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'tus-dial-code',
  standalone: true,
  imports: [NgIf, FormsModule, NgClass, NgFor],
  templateUrl: './tus-dial-code.component.html',
  styleUrl: './tus-dial-code.component.css',
})
export class TusDialCodeComponent {
  @Input() defaultDialCode!: string;
  @Input() data: any[] = [];
  @Input() className!: string;
  @Input() height!: string;
  @Input() labelText!: string;
  @Input() mandatory: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() optionLineBreack: boolean = true;
  @Input() setValue!: (parameter: any) => void;
  @Input() isSkeletonLoading: boolean = false;
  @ViewChild('targetDiv') targetDiv!: ElementRef;
  @ViewChild('containerDiv') containerDiv!: ElementRef;
  isDropDown: boolean = false;
  searchVisible = false;
  inputText: string = '';
  country: any[] = Country.countryData;
  inputValue: string = 'India';
  selectedCountry: any = {
    name: {
      common: 'India',
      official: 'Republic of India',
    },
    cca2: 'IN',
    ccn3: '356',
    cca3: 'IND',
    cioc: 'IND',
    currencies: {
      INR: {
        name: 'Indian rupee',
        symbol: '₹',
      },
    },
    idd: {
      root: '+9',
      suffixes: ['1'],
    },
    region: 'Asia',
    area: 3287590,
    flag: '🇮🇳',
    population: 1380004385,
    fifa: 'IND',
    timezones: ['UTC+05:30'],
    continents: ['Asia'],
    flags: {
      png: 'https://flagcdn.com/w320/in.png',
      svg: 'https://flagcdn.com/in.svg',
      alt: 'The flag of India is composed of three equal horizontal bands of saffron, white and green. A navy blue wheel with twenty-four spokes — the Ashoka Chakra — is centered in the white band.',
    },
    coatOfArms: {
      png: 'https://mainfacts.com/media/images/coats_of_arms/in.png',
      svg: 'https://mainfacts.com/media/images/coats_of_arms/in.svg',
    },
    startOfWeek: 'monday',
    postalCode: {
      format: '######',
      regex: '^(\\d{6})$',
    },
  };

  ngOnInit() {
    if (this.defaultDialCode) {
      const data = this.country?.filter((item: any) => {
        const dialCode = `${item.idd.root}${
          item.idd.suffixes?.length ? item.idd.suffixes[0] : ''
        }`;
        if (this.defaultDialCode === dialCode) {
          return item;
        }
      });
      this.selectedCountry = data[0];
      this.inputValue = data[0]?.name?.common;
    }
  }

  ngOnChanges() {
    if (this.defaultDialCode) {
      const data = this.country?.filter((item: any) => {
        const dialCode = `${item.idd.root}${
          item.idd.suffixes?.length ? item.idd.suffixes[0] : ''
        }`;
        if (this.defaultDialCode === dialCode) {
          return item;
        }
      });
      this.selectedCountry = data[0];
      this.inputValue = data[0]?.name?.common;
    }
  }

  //To close the dic outside click
  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (
      !this.containerDiv.nativeElement.contains(event.target) &&
      this.targetDiv.nativeElement.style.display !== 'none'
    ) {
      this.searchVisible = false;
      this.isDropDown = this.searchVisible;
    }
  }

  show() {
    this.searchVisible = !this.searchVisible;
    this.isDropDown = !this.isDropDown;
  }

  setData(value: any) {
    this.inputValue = value.name?.common;
    this.inputText = '';
    this.selectedCountry = value;
    const dialCode = value.idd.root + value.idd.suffixes[0];
    this.setValue(dialCode);
    this.searchVisible = false;
    this.isDropDown = false;
  }

  // @HostListener('document:keydown', ['$event'])
  // onkeydown(event: KeyboardEvent) {
  //   var list = document.getElementById('list');
  //   if (list && this.searchVisible) {
  //     const key = event.key;
  //     const data = this.country.filter((item: any) => {
  //       const startsWithKey = item.cca3.toLowerCase().startsWith(`${key}`);
  //       return startsWithKey;
  //     });
  //     const seventhItem = document.getElementById(data[0].cca3);
  //     if (seventhItem) {
  //       seventhItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //     }
  //   }
  // }

  setSearch() {
    this.inputText = this.inputValue;
    this.searchVisible = true;
  }

  hasFilteredItems() {
    return this.country.some((item: any) =>
      item.name?.common?.toUpperCase().includes(this.inputText.toUpperCase())
    );
  }
}
