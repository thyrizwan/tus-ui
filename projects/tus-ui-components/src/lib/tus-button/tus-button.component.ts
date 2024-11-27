import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tus-button',
  standalone: true,
  imports: [NgIf],
  templateUrl: './tus-button.component.html',
  styleUrls: ['./tus-button.component.css','../tailwind.css']
})
export class TusButtonComponent {

  @Input() type: string = "submit";
  @Input() isLoading: boolean = false;
  @Input() title: string = 'Button Title';
  @Input() isSkeletonLoading: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() isWidth: any;
  @Input() height!: string;
  @Output() onClick: EventEmitter<any> =
  new EventEmitter<any>();

  onButtonClick(){
    this.onClick.emit();
  }
}
