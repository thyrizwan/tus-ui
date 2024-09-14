import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'tus-input',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './tus-input.component.html',
  styleUrl: './tus-input.component.css'
})
export class TusInputComponent {
  @Input() control!: FormControl | any;
  @Input() type: string = "text";
  @Input() placeholder!: string;
  @Input() label!: string;
  @Input() mandatory: boolean = false;
  @Input() readonly: boolean = false;
  @Input() isSkeletonLoading: boolean = false;
}
