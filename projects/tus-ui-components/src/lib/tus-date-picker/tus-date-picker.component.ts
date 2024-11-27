import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'tus-date-picker',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, FormsModule],
  templateUrl: './tus-date-picker.component.html',
  styleUrls: ['./tus-date-picker.component.css','../tailwind.css']
})
export class TusDatePickerComponent {
  @Input() startDate: any = '';
  @Input() endDate: any = '';
  @Input() maxDate: any;
  @Input() dateFormat: string = 'DD-MM-YYYY';
  @Input() placeHolder: string = 'Select a date';
  @Input() label: string = 'Date Picker Label';
  @Input() dateRange: boolean = false;
  @Output() setDate = new EventEmitter<any>();
  @Input() selectedDate: any = null;
  @Input() labelText!: string;
  @Input() mandatory: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() isSkeletonLoading: boolean = false;
  @Input() height!: string;

  //Time
  @Input() time: boolean = false;

  constructor() {}

  ngOnChanges() {
    this.startDate = this.getFormattedDate(this.startDate);
    this.endDate = this.getFormattedDate(this.endDate);
    this.selectedDate = this.getFormattedDate(this.selectedDate);
  }

  private getFormattedDate(date: Date): string {
    if (date) {
      const date1 = new Date(date);
      const year = date1.getFullYear();
      const month = ('0' + (date1?.getMonth() + 1)).slice(-2);
      const day = ('0' + date1?.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    } else {
      return '';
    }
  }

  setValue() {
    if (this.dateRange) {
      if (this.startDate && this.endDate) {
        const i = {
          startDate: new Date(this.startDate),
          endDate: new Date(this.endDate),
        };
        this.setDate.emit(i);
      }
    } else {
      this.setDate.emit(new Date(this.selectedDate));
    }
  }

  get formattedDate(): string {
    return this.startDate.toISOString().slice(0, 10);
  }
}
