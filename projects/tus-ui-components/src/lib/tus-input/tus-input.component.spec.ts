import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TusInputComponent } from './tus-input.component';

describe('TusInputComponent', () => {
  let component: TusInputComponent;
  let fixture: ComponentFixture<TusInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TusInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TusInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
