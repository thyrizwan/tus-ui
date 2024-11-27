import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TusButtonComponent } from '../../projects/tus-ui-components/src/lib/tus-button/tus-button.component';
import { TusTextAreaComponent } from '../../projects/tus-ui-components/src/lib/tus-text-area/tus-text-area.component';
import { TusTableComponent } from '../../projects/tus-ui-components/src/lib/tus-table/tus-table.component';
import { TusPhoneNumberComponent } from '../../projects/tus-ui-components/src/lib/tus-phone-number/tus-phone-number.component';
import { TusDatePickerComponent } from '../../projects/tus-ui-components/src/lib/tus-date-picker/tus-date-picker.component';
import { TusCustomDatePickerComponent } from '../../projects/tus-ui-components/src/lib/tus-custom-date-picker/tus-custom-date-picker.component';
import { TusCheckBoxComponent } from '../../projects/tus-ui-components/src/lib/tus-check-box/tus-check-box.component';
import { TusSelectComponent } from '../../projects/tus-ui-components/src/lib/tus-select/tus-select.component';
import { TusInputComponent } from '../../projects/tus-ui-components/src/lib/tus-input/tus-input.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TusButtonComponent,
    TusTextAreaComponent,
    TusTableComponent,
    TusPhoneNumberComponent,
    TusDatePickerComponent,
    TusCustomDatePickerComponent,
    TusCheckBoxComponent,
    TusSelectComponent,
    TusInputComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Tru Uni Soft';
  myForm = new FormGroup({
    name: new FormControl(),
  });
  dialCode: string = '+91';
  tableData: any = [
    {
      name: 'Rizwan',
    },
  ];
  endDate: Date = new Date();
  startDate: Date = new Date(
    this.endDate.getFullYear(),
    this.endDate.getMonth(),
    this.endDate.getDate() - 6
  );
  maxDate: Date = new Date(
    this.endDate.getFullYear(),
    this.endDate.getMonth(),
    this.endDate.getDate() + 1
  );
  header: any[] = [
    {
      name: '#',
      selector: (row: any) => row.serialNo,
      isSort: true,
      sortColumn: 'serialNo',
      width: '40px',
    },
    {
      name: 'Name',
      selector: (row: any) => row.name,
      isSort: true,
      sortColumn: 'name',
      width: '300px',
    },
    {
      name: 'Description',
      selector: (row: any) => row.description,
      width: '500px',
    },
    {
      type: 'action',
      name: 'Action',
      actions: [
        {
          label: 'Edit',
          class:
            'text-green-600  hover:bg-green-800 hover:text-white px-2 py-2 rounded-md',
          action: this.handleEdit.bind(this),
          isIcon: true,
          icon: 'bootstrapPencilSquare',
          row: 'id',
        },
      ],
    },
  ];

  handleEdit(id: any) {
    //   this.router.navigate([
    //     `${this.currentmodule}/edit-diagnosis/${encodeURIComponent(
    //     this.urlHashingService.setParameter(id)
    //   )}`,
    // ]);
    console.log('Clicked');
  }
  selectData: any[] = [
    {
      label: 'Option 1',
      value: '1',
    },
    {
      label: 'Option 2',
      value: '2',
    },
    {
      label: 'Option 3',
      value: '3',
    },
  ];

  setSelect = (value: any) => {};

  setDate(value: any) {
    this.startDate = value?.startDate;
    this.endDate = value?.endDate;
  }

  setDialCode(value: any) {
    this.dialCode = value;
  }

  public funSubmit() {
    console.log(this.myForm.value.name);
  }
}
