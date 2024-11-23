import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  Pipe,
  PipeTransform,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TusCheckBoxComponent } from '../tus-check-box/tus-check-box.component';
import { TusSelectComponent } from '../tus-select/tus-select.component';

@Component({
  selector: 'tus-table',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    TusSelectComponent,
    NgFor,
    NgClass,
    TusCheckBoxComponent,
    CurrencyPipe,
  ],
  templateUrl: './tus-table.component.html',
  styleUrl: './tus-table.component.css',
})
export class TusTableComponent {
  @Input() data: any[] = [];
  @Input() isSkeletonLoading: boolean = false;
  @Input() isHeaderShow: boolean = true;
  @Input() className!: any;
  @Input() isACtion: boolean = true;
  @Input() header: any[] = [];
  @Input() isActionShow: boolean = true;
  @Input() rowSelect: any[] = [
    {
      label: '10',
      value: '10',
    },
    {
      label: '20',
      value: '20',
    },
    {
      label: '30',
      value: '30',
    },
  ];
  @Input() tableHeading: string = 'Table Heading';
  rowData: any;
  @Input() dataHeader: any[] = [];
  @Input() dataViewShow: boolean = false;
  //serch input
  inputText!: string;
  showSearch: boolean = false;
  //Pagination
  itemsPerPage: number = 10;
  currentPage: number = 1;

  defaultValue: any = {
    label: '10',
    value: '10',
  };

  isClear: boolean = false;
  isReadOnly: boolean = false;
  isFocus: boolean = true;
  tableAction: string = 'none';
  @ViewChild('myDiv') myDiv!: ElementRef;

  //Sorting
  sortBy: string = 'id'; // Initial sort column

  // This is for data action
  secondData: any[] = [];
  isOpen = false;
  screenWidth!: any;
  noData!: string;
  private clickTimeout: any = null;
  private singleClickDelay = 250;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.noData = 'No Data Avaliable';
    this.data = this.data.map((item) => ({
      ...item,
      showAction: false,
      sortDirection: 'asc',
    }));

    setTimeout(() => {
      this.secondData = this.data;
      this.showSearch = true;
    }, 3000);
  }

  ngOnChanges() {
    this.secondData = this.data;
  }

  ngAfterViewInit() {
    this.screenWidth = this.myDiv.nativeElement.offsetWidth;
    this.getDynamicWidth();
    this.changeDetectorRef.detectChanges();

    let previousWidth = this.myDiv.nativeElement.offsetWidth;

    const observerCallback = (mutationsList: any, observer: any) => {
      const currentWidth = this.myDiv.nativeElement.offsetWidth;
      if (currentWidth !== previousWidth) {
        this.onResize(currentWidth);
        previousWidth = currentWidth;
      }
    };

    const observer = new ResizeObserver(observerCallback);
    observer.observe(this.myDiv.nativeElement);
  }

  handleClick(index: number) {
    if (this.dataViewShow) {
      if (this.clickTimeout) {
        clearTimeout(this.clickTimeout);
        this.clickTimeout = null;
        // Double-click detected
        this.rowData = this.displayedData[index];
        this.openSidebar();
      } else {
        this.clickTimeout = setTimeout(() => {
          this.clickTimeout = null;
          // Single-click detected
          this.rowData = '';
          this.closeSidebar();
        }, this.singleClickDelay);
      }
    }
  }

  openSidebar() {
    this.isOpen = true;
  }

  closeSidebar() {
    this.isOpen = false;
  }

  getDynamicWidth(): any {
    // Large screen: screenWidth - 260px
    if (this.screenWidth) {
      return `calc(${this.screenWidth}px - 30px)`;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.screenWidth = this.myDiv.nativeElement.offsetWidth;
    setTimeout(() => {
      this.getDynamicWidth();
    }, 0);
    this.changeDetectorRef.detectChanges();
  }

  //To catch the seleceted row value
  setValue = (value: any) => {
    this.itemsPerPage = parseInt(value.value);
  };

  //TO diaplay data according item per page
  get displayedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    if (startIndex > this.data.length) {
      // Adjust the currentPage value to display the last page of data
      return this.data.slice(0, endIndex);
    }

    return this.data.slice(startIndex, endIndex);
  }

  // To find total page number according to data and item per page
  get pageNumbers(): number[] {
    const pageCount = Math.ceil(this.data.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.pageNumbers.length) {
      this.currentPage = pageNumber;
    }
  }

  firstPage() {
    this.currentPage = 1;
  }

  lastPage() {
    this.currentPage = this.pageNumbers.length;
  }

  get visiblePageNumbers(): number[] {
    const pageCount = Math.ceil(this.data.length / this.itemsPerPage);
    const maxVisiblePages = 5; // Adjust this value as needed

    if (pageCount <= maxVisiblePages) {
      return this.pageNumbers;
    }

    const middlePage = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, this.currentPage - middlePage);
    const endPage = Math.min(pageCount, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }

  backBtn() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextBtn() {
    if (this.currentPage < Math.ceil(this.data.length / this.itemsPerPage)) {
      this.currentPage++;
    }
  }

  //Sort the data
  sortData(data: any[], sortBy: string, sortDirection: 'asc' | 'desc'): any[] {
    return data.sort((a, b) => {
      if (typeof a[sortBy] === 'number' && typeof b[sortBy] === 'number') {
        if (sortDirection === 'asc') {
          return a[sortBy] - b[sortBy];
        } else {
          return b[sortBy] - a[sortBy];
        }
      } else {
        if (sortDirection === 'asc') {
          return a[sortBy].localeCompare(b[sortBy]);
        } else {
          return b[sortBy].localeCompare(a[sortBy]);
        }
      }
    });
  }

  toggleSort(column: any) {
    column.sortDirection = column.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortData(this.data, column.sortColumn, column.sortDirection);
  }

  //search
  setSearch() {
    // this.secondData = this.data;
    // if (this.inputText != '') {
    //   const text = this.inputText;
    //   const column = this.sortOn;
    //   this.secondData = this.secondData.filter(function (object) {
    //     return object[column].toString().includes(text);
    //   });
    // } else {
    //   this.secondData = this.data;
    // }
    this.data = this.secondData.slice();
    if (this.inputText !== '') {
      const text = this.inputText.toLowerCase(); // Convert input text to lowercase for case-insensitive search

      // Filter the data based on each column
      this.data = this.data.filter(function (object) {
        for (const column in object) {
          if (Object.prototype.hasOwnProperty.call(object, column)) {
            if (
              object[column] !== undefined &&
              object[column] !== null &&
              object[column]?.toString().toLowerCase().includes(text)
            ) {
              return true; // If any field matches, return true to keep the object
            }
          }
        }
        return false; // If no field matches, return false to filter out the object
      });
    }
  }

  //To View table action
  handleTableAction(row: any, showAction: boolean) {
    this.displayedData.forEach((item) => {
      item.showAction = item === row;
    });

    row.showAction = !showAction;
  }
}

@Pipe({
  name: 'dynamicPipe',
  standalone: true,
})
export class DynamicPipe implements PipeTransform {
  transform(value: any, column: any): any {
    if (column && column.pipeName) {
      const pipeArgs = column.pipeArgs || [];
      const pipeInstance = new column.pipeName();
      pipeInstance._locale = 'en-IN';
      return pipeInstance.transform(value, ...pipeArgs);
    }
    return value;
  }
}
