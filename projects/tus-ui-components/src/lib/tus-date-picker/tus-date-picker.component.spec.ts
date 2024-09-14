import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TusDatePickerComponent } from './tus-date-picker.component';

describe('TusDatePickerComponent', () => {
  let component: TusDatePickerComponent;
  let fixture: ComponentFixture<TusDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TusDatePickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TusDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
