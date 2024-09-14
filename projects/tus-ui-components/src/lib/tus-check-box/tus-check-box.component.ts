import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'tus-check-box',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './tus-check-box.component.html',
  styleUrl: './tus-check-box.component.css',
})
export class TusCheckBoxComponent {
  @Input() control!: FormControl | any;
  @Input() label!: string;
  @Input() isSkeletonLoading: boolean = false;
  @Input() isJustify: boolean = false;
  @Input() isLeftPlace: boolean = true;
  @Input() readonly: boolean = false;
  @Input() isChecked: boolean = false;
  @Input() labelPlaceRight: boolean = false;
  @Input() value!: number;

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  onButtonChange(event: any) {
    this.onChange.emit(event);
  }
}
