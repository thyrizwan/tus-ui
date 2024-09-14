import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TusSelectComponent } from './tus-select.component';

describe('TusSelectComponent', () => {
  let component: TusSelectComponent;
  let fixture: ComponentFixture<TusSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TusSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TusSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
