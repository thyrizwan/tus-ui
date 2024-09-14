import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TusCustomDatePickerComponent } from './tus-custom-date-picker.component';

describe('TusCustomDatePickerComponent', () => {
  let component: TusCustomDatePickerComponent;
  let fixture: ComponentFixture<TusCustomDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TusCustomDatePickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TusCustomDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
