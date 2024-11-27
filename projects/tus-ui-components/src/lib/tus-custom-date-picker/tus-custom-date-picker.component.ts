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
  selector: 'tus-custom-date-picker',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, FormsModule],
  templateUrl: './tus-custom-date-picker.component.html',
  styleUrls: ['./tus-custom-date-picker.component.css','../tailwind.css']
})
export class TusCustomDatePickerComponent {
  @Input() startDate: any = '';
  @Input() endDate: any = '';
  @Input() maxDate: any;
  @Input() dateFormat: string = 'DD-MM-YYYY';
  @Input() placeHolder: string = 'Select a date';
  @Input() label: string = 'Custome Date Picker Label';
  @Input() dateRange: boolean = false;
  @Output() setDate = new EventEmitter<any>();
  @Input() selectedDate: Date | null = null;
  @Input() labelText!: string;
  @Input() mandatory: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() isSkeletonLoading: boolean = false;
  @Input() readonly: boolean = true;
  @Input() height: string = 'h-12';

  //Time
  @Input() time: boolean = false;
  selectedTime: boolean = false;
  hourValue!: number;
  hour!: number;
  minuteValue!: number;
  minute!: number;
  terrestrialTime!: string;
  defaultStartDate: any;
  defaultEndDate: any;
  defaultSelectedDate: any;

  currentDay!: number;
  lastDay: number = 7;
  currentDate: Date = new Date();
  previousMonthDays: any = [];
  nextMonthDays: any = [];
  days: number[] = [];
  currentMonthYear: string = '';
  currentMonth: string = '';
  selectedMonth!: number;
  showDayModal: boolean = false;
  showMonthModal: boolean = false;
  showYearModal: boolean = false;
  months: any = [
    { label: 'Jan', value: 0 },
    { label: 'Feb', value: 1 },
    { label: 'Mar', value: 2 },
    { label: 'Apr', value: 3 },
    { label: 'May', value: 4 },
    { label: 'Jun', value: 5 },
    { label: 'Jul', value: 6 },
    { label: 'Aug', value: 7 },
    { label: 'Sep', value: 8 },
    { label: 'Oct', value: 9 },
    { label: 'Nov', value: 10 },
    { label: 'Dec', value: 11 },
  ];

  bars: any = [
    { value: 'M', label: 'Monday' },
    { value: 'T', label: 'Tuesday' },
    { value: 'W', label: 'Wednesday' },
    { value: 'T', label: 'Thursday' },
    { value: 'F', label: 'Friday' },
    { value: 'S', label: 'Saturday' },
    { value: 'S', label: 'Sunday' },
  ];
  currentYear: number = new Date().getFullYear();
  yearRange: number[] = [];
  isDisplayedAbove: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderCalendar();
    this.initializeYearRange();
    this.positionCalendar();

    setTimeout(() => {
      if (this.dateRange && this.startDate && this.endDate) {
        const datePickerDateInput = this.el.nativeElement.querySelector(
          '#datePickerDateInput'
        );
        if (datePickerDateInput) {
          datePickerDateInput.value = `${this.formatDate(
            this.startDate
          )}  -  ${this.formatDate(this.endDate)}`;
        }
      }
      if (this.selectedDate !== null) {
        this.currentDate = new Date(this.selectedDate);
      }
      if (this.selectedDate && !this.dateRange) {
        const datePickerDateInput = this.el.nativeElement.querySelector(
          '#datePickerDateInput'
        );
        datePickerDateInput.value = this.formatDate(this.selectedDate);
      }
    }, 0);
    const today = new Date();
    this.hour = today.getHours();
    this.terrestrialTime = this.hour >= 12 ? 'PM' : 'AM';
    this.minute = today.getMinutes();
    this.hourValue = this.hour;
    this.minuteValue = this.minute;
    setInterval(() => {
      if (!this.selectedTime) {
        const today = new Date();
        this.hour = today.getHours();
        this.terrestrialTime = this.hour >= 12 ? 'PM' : 'AM';
        this.minute = today.getMinutes();
      }
    }, 1000);
  }

  ngOnChanges() {
    setTimeout(() => {
      if (this.dateRange && this.startDate && this.endDate) {
        const datePickerDateInput = this.el.nativeElement.querySelector(
          '#datePickerDateInput'
        );
        if (datePickerDateInput) {
          datePickerDateInput.value = `${this.formatDate(
            this.startDate
          )}  -  ${this.formatDate(this.endDate)}`;
        }
      }
      if (this.selectedDate !== null) {
        this.currentDate = new Date(this.selectedDate);
      }
      if (this.selectedDate && !this.dateRange) {
        const datePickerDateInput = this.el.nativeElement.querySelector(
          '#datePickerDateInput'
        );
        datePickerDateInput.value = this.formatDate(this.selectedDate);
      }
    }, 0);
  }

  clearValue() {
    const datePickerDateInput = this.el.nativeElement.querySelector(
      '#datePickerDateInput'
    );
    datePickerDateInput.value = '';
    this.selectedDate = null;
  }
  //Show Whole month date base selected month and yesr

  renderCalendar() {
    this.days = [];
    this.previousMonthDays = [];
    this.nextMonthDays = [];
    const firstDay = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      1
    );
    const lastDay = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      0
    );

    this.currentDay = firstDay.getDay();

    this.currentYear = this.currentDate.getFullYear();

    this.currentMonthYear = `${this.currentDate.getFullYear()}`;
    this.currentMonth = `${this.currentDate.toLocaleString('default', {
      month: 'long',
    })}`;

    for (let day = 1; day <= lastDay.getDate(); day++) {
      this.days.push(day);
    }
    this.getLastDaysOfPreviousMonth();
    this.getNextDaysOfNextMonth();
  }

  getLastDaysOfPreviousMonth() {
    const firstDayOfCurrentMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      1
    );
    const lastDayOfPreviousMonth = new Date(firstDayOfCurrentMonth);
    lastDayOfPreviousMonth.setDate(0); // Set the date to 0 to get the last day of the previous month
    const lastDay = lastDayOfPreviousMonth.getDate();

    // Create an array of days for the previous month
    let ld = lastDay - ((this.currentDay === 0 ? 7 : this.currentDay) - 2);
    for (let i = 1; i < (this.currentDay === 0 ? 7 : this.currentDay); i++) {
      this.previousMonthDays.push(ld);
      ld++;
    }
  }

  // Function to get the days of the next month
  getNextDaysOfNextMonth() {
    const lastDayOfCurrentMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      0
    );
    this.lastDay = lastDayOfCurrentMonth.getDay();

    const firstDayOfNextMonth = new Date(lastDayOfCurrentMonth);
    firstDayOfNextMonth.setDate(1); // Set the date to 1 to get the first day of the next month
    const firstDay = firstDayOfNextMonth.getDate();

    // Create an array of days for the next month
    let fd = firstDay;
    for (let i = 0; i < 7 - (this.lastDay === 0 ? 7 : this.lastDay); i++) {
      // You can adjust the upper limit as needed
      this.nextMonthDays.push(fd);
      fd++;
    }
  }

  formatDate(
    date: Date,
    format: any = this.dateFormat,
    useMonthAbbreviation: boolean = true
  ) {
    if (date) {
      const year = date.getFullYear();
      const month = useMonthAbbreviation
        ? date.toLocaleString('en', { month: 'short' }) // Three-letter month abbreviation
        : String(date.getMonth() + 1).padStart(2, '0'); // Get the three-letter month abbreviation
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      format = format.replace('YYYY', year);
      format = format.replace('MMM', month);
      format = format.replace('MM', month);
      format = format.replace('DD', day);
      format = format.replace('HH', hours);
      format = format.replace('mm', minutes);
      format = format.replace('ss', seconds);

      return format;
    } else {
      return '';
    }
  }

  showCalendar() {
    if (this.selectedDate === null || this.selectedDate == undefined) {
      this.currentDate = new Date();
    }
    if (!this.showDayModal) {
      if (this.showMonthModal || this.showYearModal) {
        this.showDayModal = false;
        this.showMonthModal = false;
        this.showYearModal = false;
      } else {
        this.showDayModal = true;
      }
    } else {
      this.showMonthModal = false;
      this.showYearModal = false;
      this.showDayModal = false;
    }
    this.positionCalendar();
  }

  //*Day

  isMaxDate(day: number) {
    const d = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      day
    );
    if (this.maxDate && d >= this.maxDate) {
      return true;
    } else {
      return false;
    }
  }

  isCurrentDay(day: number): boolean {
    const currentDate = new Date();
    return (
      currentDate.getDate() === day &&
      currentDate.getMonth() === this.currentDate.getMonth() &&
      currentDate.getFullYear() === this.currentDate.getFullYear()
    );
  }

  isSelectedDay(day: number): boolean {
    if (this.dateRange && this.startDate && this.endDate) {
      const d = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        day
      );
      if (d >= this.startDate && d <= this.endDate) {
        return true;
      }
    }
    if (this.maxDate && this.selectedDate && this.selectedDate > this.maxDate) {
      return false;
    } else if (this.dateRange) {
      return false;
    } else {
      if (this.selectedDate) {
        return (
          this.selectedDate.getDate() === day &&
          this.selectedDate.getMonth() === this.currentDate.getMonth() &&
          this.selectedDate.getFullYear() === this.currentDate.getFullYear()
        );
      }
      return false;
    }
  }

  selectDay(day: number) {
    this.selectedDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      day
    );

    if (this.maxDate) {
      if (this.selectedDate < this.maxDate) {
        const datePickerDateInput = this.el.nativeElement.querySelector(
          '#datePickerDateInput'
        );
        if (this.dateRange) {
          if (this.endDate) {
            this.startDate = this.selectedDate;
            this.endDate = '';
            datePickerDateInput.value = `${this.formatDate(
              this.startDate
            )}  -  ${this.formatDate(this.endDate)}`;
          } else {
            if (this.startDate) {
              if (this.startDate <= this.selectedDate) {
                this.endDate = this.selectedDate;
                datePickerDateInput.value = `${this.formatDate(
                  this.startDate
                )}  -  ${this.formatDate(this.endDate)}`;
              } else {
                return;
              }
            } else {
              this.startDate = this.selectedDate;
              datePickerDateInput.value = `${this.formatDate(
                this.startDate
              )}  -  ${this.formatDate(this.endDate)}`;
            }
          }
        } else {
          datePickerDateInput.value = `${this.formatDate(this.selectedDate)}`;
        }
        if (!this.time) {
          if (this.dateRange) {
            if (this.startDate && this.endDate) {
              this.showDayModal = false;
            }
          } else {
            this.showDayModal = false;
          }
        }
        this.renderCalendar();
      }
    } else {
      const datePickerDateInput = this.el.nativeElement.querySelector(
        '#datePickerDateInput'
      );
      if (this.dateRange) {
        if (this.endDate) {
          this.startDate = this.selectedDate;
          this.endDate = '';
          datePickerDateInput.value = `${this.formatDate(
            this.startDate
          )}  -  ${this.formatDate(this.endDate)}`;
        } else {
          if (this.startDate) {
            if (this.startDate <= this.selectedDate) {
              this.endDate = this.selectedDate;
              datePickerDateInput.value = `${this.formatDate(
                this.startDate
              )}  -  ${this.formatDate(this.endDate)}`;
            } else {
              return;
            }
          } else {
            this.startDate = this.selectedDate;
            datePickerDateInput.value = `${this.formatDate(
              this.startDate
            )}  -  ${this.formatDate(this.endDate)}`;
          }
        }
      } else {
        datePickerDateInput.value = `${this.formatDate(this.selectedDate)}`;
      }
      if (!this.time) {
        if (this.dateRange) {
          if (this.startDate && this.endDate) {
            this.showDayModal = false;
          }
        } else {
          this.showDayModal = false;
        }
      }
      this.renderCalendar();
    }
    if (!this.time) {
      if (this.dateRange) {
        const value = {
          startDate: this.startDate,
          endDate: this.endDate,
        };
        this.setDate.emit(value);
      } else {
        this.setDate.emit(this.selectedDate);
      }
    }
  }

  //*Month

  showMonth() {
    this.showDayModal = false;
    this.showMonthModal = true;
    this.renderCalendar();
    this.positionCalendar();
  }

  prevMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.renderCalendar();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.renderCalendar();
  }

  selectMonth = (month: any) => {
    if (this.maxDate) {
      const d = this.currentDate.setMonth(month);
      if (this.currentDate && d < this.maxDate) {
        this.showMonthModal = false;
        this.currentDate.setMonth(month);
        this.renderCalendar();
        setTimeout(() => {
          this.showDayModal = true;
          this.positionCalendar();
        }, 10);
      }
    } else {
      this.showMonthModal = false;
      this.currentDate.setMonth(month);
      this.renderCalendar();
      setTimeout(() => {
        this.showDayModal = true;
        this.positionCalendar();
      }, 10);
    }
  };

  isCurrentMonth(month: number): boolean {
    const currentDate = new Date();
    return (
      currentDate.getMonth() === month &&
      currentDate.getFullYear() === this.currentDate.getFullYear()
    );
  }

  isMaxMonth(month: number) {
    const d = new Date(this.currentDate.getFullYear(), month);
    if (this.maxDate && d > this.maxDate) {
      return true;
    } else {
      return false;
    }
  }

  //*Year

  showYear() {
    this.showMonthModal = false;
    this.showYearModal = true;
    this.renderCalendar();
    this.positionCalendar();
  }

  isMaxYear(year: number) {
    const d = new Date(year, this.currentDate.getMonth());
    if (this.maxDate && d > this.maxDate) {
      return true;
    } else {
      return false;
    }
  }

  prevYear() {
    this.currentDate.setFullYear(this.currentDate.getFullYear() - 1);
    this.renderCalendar();
  }

  nextYear() {
    this.currentDate.setFullYear(this.currentDate.getFullYear() + 1);
    this.renderCalendar();
  }

  selectYear = (year: any) => {
    if (this.maxDate) {
      const d = new Date();
      if (this.currentDate && d < this.maxDate) {
        this.showYearModal = false;
        this.currentDate.setFullYear(year);
        this.renderCalendar();
        setTimeout(() => {
          this.showMonthModal = true;
          this.positionCalendar();
        }, 10);
      }
    } else {
      this.showYearModal = false;
      this.currentDate.setFullYear(year);
      this.renderCalendar();
      setTimeout(() => {
        this.showMonthModal = true;
        this.positionCalendar();
      }, 10);
    }
  };

  isCurrentYear(year: number): boolean {
    const currentDate = new Date();
    return currentDate.getFullYear() === year;
  }

  initializeYearRange() {
    const startYear = this.currentYear - 10;
    const endYear = this.currentYear + 10;
    for (let year = startYear; year < endYear; year++) {
      this.yearRange.push(year);
    }
  }

  previousYearRange() {
    this.currentYear -= 10;
    this.yearRange = this.generateYearRange();
  }

  nextYearRange() {
    this.currentYear += 10;
    this.yearRange = this.generateYearRange();
  }

  generateYearRange() {
    const startYear = this.currentYear - 10;
    const endYear = this.currentYear + 10;
    const range = [];
    for (let year = startYear; year < endYear; year++) {
      range.push(year);
    }
    return range;
  }

  //Time

  setHour() {
    this.selectedTime = true;
    this.hourValue = this.hour;
  }

  setMinute() {
    this.selectedTime = true;
    this.minuteValue = this.minute;
  }

  setTime() {
    this.selectedTime = true;
    const datePickerDateInput = this.el.nativeElement.querySelector(
      '#datePickerDateInput'
    );
    if (this.selectedDate) {
      datePickerDateInput.value = '';
      this.selectedDate.setHours(this.hourValue);
      this.selectedDate.setMinutes(this.minuteValue);
      datePickerDateInput.value = ` ${this.formatDate(
        this.selectedDate,
        'DD-MMM-YYYY HH:mm'
      )}`;
      this.showDayModal = false;
      this.setDate.emit(this.selectedDate);
    }
  }

  reset() {
    // if (!this.dateRange) {
    this.currentDate = new Date();
    this.selectedDate = null;
    // }
    const datePickerDateInput = this.el.nativeElement.querySelector(
      '#datePickerDateInput'
    );
    datePickerDateInput.value = ' ';

    if (this.time) {
      this.selectedTime = false;
      const today = new Date();
      this.hour = today.getHours();
      this.terrestrialTime = this.hour >= 12 ? 'PM' : 'AM';
      this.minute = today.getMinutes();
      this.hourValue = this.hour;
      this.minuteValue = this.minute;
    }
    this.renderCalendar();
    this.yearRange = this.generateYearRange();
    this.setDate.emit('');
  }

  //*Outside Close

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      if (this.showDayModal) {
        this.showDayModal = false;
      }
      // if (this.showMonthModal) {
      //   this.showMonthModal = false;
      // }
      // if (this.showYearModal) {
      //   this.showYearModal = false;
      // }
    }
  }

  //* On Resize Position
  @HostListener('window:resize')
  onWindowResize() {
    this.positionCalendar();
  }

  positionCalendar() {
    setTimeout(() => {
      const datePickerDateInput = this.el.nativeElement.querySelector(
        '#datePickerDateInput'
      );
      const calendar = this.el.nativeElement.querySelector('#calendar');

      if (datePickerDateInput && calendar) {
        const inputRect = datePickerDateInput.getBoundingClientRect();
        const calendarHeight = calendar.clientHeight;
        const viewportHeight = window.innerHeight;

        let topPosition = inputRect.bottom;
        if (inputRect.bottom + calendarHeight > viewportHeight) {
          topPosition = inputRect.top - calendarHeight - 20;
          if (topPosition < 0) {
            topPosition = 0;
          }
        }
        if (topPosition > 350) {
          topPosition = 350;
        }

        this.renderer.setStyle(calendar, 'top', `${topPosition}px`);
      }
    }, 10);
  }
}
