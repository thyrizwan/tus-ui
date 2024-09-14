import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'tus-select',
  standalone: true,
  imports: [NgIf, FormsModule, NgClass, NgFor],
  templateUrl: './tus-select.component.html',
  styleUrl: './tus-select.component.css',
})
export class TusSelectComponent {
  @Input() defaultValue: any;
  @Input() data: any[] = [];
  @Input() className!: string;
  @Input() isReadOnly: boolean = false;
  @Input() isClear: boolean = true;
  @Input() height!: string;
  @Input() labelText!: string;
  @Input() placeholder!: string;
  @Input() mandatory: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() optionLineBreack: boolean = true;
  @Input() index!: number;
  @Input() isAccordian: boolean = false;
  @Input() isPlusIcon: boolean = false;
  @Input() setValue!: (parameter: any) => void;
  @Input() isSkeletonLoading: boolean = false;
  @Input() liSkeletonLoading: boolean = false;
  @Output() onPlusIconClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() onInput: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('targetDiv') targetDiv!: ElementRef;
  @ViewChild('containerDiv') containerDiv!: ElementRef;
  @ViewChild('keyScroll') keyScroll!: ElementRef;

  isDropDown: boolean = false;
  searchVisible = false;
  inputText = '';
  inputValue!: string;
  selectedIndex: number = 0;

  ngOnInit() {
    if (this.defaultValue) {
      this.inputValue = this.defaultValue.label;
    }
  }

  ngOnChanges() {
    if (this.defaultValue) {
      this.inputValue = this.defaultValue.label;
    }
  }

  clearSelectValue() {
    this.inputText = '';
    this.inputValue = '';
    this.setValue('');
  }

  onPlusIconClickFnc() {
    this.onPlusIconClick.emit();
  }

  getInput() {
    this.onInput.emit(this.inputValue);
  }

  //To iterate over the li items on key press
  // @HostListener('window:keydown', ['$event'])
  // onKeyDown(event: KeyboardEvent) {
  //   switch (event.key) {
  //     case 'ArrowUp':
  //       event.preventDefault();
  //       this.selectedIndex =
  //         (this.selectedIndex - 1 + this.data.length) % this.data.length;
  //       this.scrollIntoView(true);
  //       break;
  //     case 'ArrowDown':
  //       event.preventDefault();
  //       this.selectedIndex = (this.selectedIndex + 1) % this.data.length;
  //       this.scrollIntoView(false);
  //       break;
  //   }
  // }

  // scrollIntoView(isUP: boolean) {
  //   const container = this.keyScroll.nativeElement;
  //   if (isUP) {
  //     if (this.selectedIndex == this.data.length - 1) {
  //       container.scrollTop = container.scrollHeight;
  //     } else if (this.selectedIndex >= 2) {
  //       container.scrollTop -= 30;
  //     }
  //   } else {
  //     if (this.selectedIndex == 0) {
  //       container.scrollTop = 0;
  //     } else if (this.selectedIndex >= 6 && this.data.length > 6) {
  //       container.scrollTop += 30;
  //     }
  //   }
  // }

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

  setSearch() {
    this.inputText = this.inputValue;
    this.searchVisible = true;
  }

  hasFilteredItems() {
    return this.data.some((item: any) =>
      item.label?.toUpperCase().includes(this.inputText.toUpperCase())
    );
  }

  show() {
    this.searchVisible = !this.searchVisible;
    this.isDropDown = !this.isDropDown;
  }

  clearValue() {
    this.inputText = '';
    this.inputValue = '';
    this.isDropDown = !this.isDropDown;
    this.searchVisible = !this.searchVisible;
    if (this.isAccordian) {
      const data = {
        index: this.index,
      };
      this.setValue(data);
    } else {
      this.setValue('');
    }
  }

  setData(value: any) {
    this.inputValue = value?.label?.trim();
    this.inputText = '';
    if (this.isAccordian) {
      const data = {
        value: value,
        index: this.index,
      };
      this.setValue(data);
    } else {
      this.setValue(value);
    }
    this.searchVisible = false;
    this.isDropDown = false;
  }
}
