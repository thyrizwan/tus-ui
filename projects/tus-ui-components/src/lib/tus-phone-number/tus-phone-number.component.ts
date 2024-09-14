import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TusDialCodeComponent } from '../tus-dial-code/tus-dial-code.component';

@Component({
  selector: 'tus-phone-number',
  standalone: true,
  imports: [NgIf, TusDialCodeComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './tus-phone-number.component.html',
  styleUrl: './tus-phone-number.component.css',
})
export class TusPhoneNumberComponent {
  @Input() isLoading: boolean = false;
  @Input() isSkeletonLoading: boolean = false;
  @Input() readonly: boolean = false;
  @Input() label!: string;
  @Input() mandatory: boolean = false;
  @Input() placeholder: string = '';
  @Input() defaultDialCode!: string;
  @Input() control!: FormControl | any;
  @Input() type: string = 'text';
  @Output() setDialCide: EventEmitter<any> = new EventEmitter<any>();

  setDial = (value: any) => {
    this.setDialCide.emit(value);
  };
}
