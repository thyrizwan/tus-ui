import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TusCheckBoxComponent } from './tus-check-box.component';

describe('TusCheckBoxComponent', () => {
  let component: TusCheckBoxComponent;
  let fixture: ComponentFixture<TusCheckBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TusCheckBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TusCheckBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
