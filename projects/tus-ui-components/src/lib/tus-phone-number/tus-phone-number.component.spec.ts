import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TusPhoneNumberComponent } from './tus-phone-number.component';

describe('TusPhoneNumberComponent', () => {
  let component: TusPhoneNumberComponent;
  let fixture: ComponentFixture<TusPhoneNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TusPhoneNumberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TusPhoneNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
