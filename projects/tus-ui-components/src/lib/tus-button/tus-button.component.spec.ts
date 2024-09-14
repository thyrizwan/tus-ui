import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TusButtonComponent } from './tus-button.component';

describe('TusButtonComponent', () => {
  let component: TusButtonComponent;
  let fixture: ComponentFixture<TusButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TusButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TusButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
