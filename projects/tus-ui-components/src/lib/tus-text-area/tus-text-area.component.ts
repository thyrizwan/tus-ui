import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'tus-text-area',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './tus-text-area.component.html',
  styleUrls: ['./tus-text-area.component.css','../tailwind.css']
})
export class TusTextAreaComponent {
  @Input() control!: FormControl | any;
  @Input() placeholder!: string;
  @Input() label!: string;
  @Input() mandatory: boolean = false;
  @Input() isSkeletonLoading: boolean = false;
  @Input() readonly: boolean = false;
}
