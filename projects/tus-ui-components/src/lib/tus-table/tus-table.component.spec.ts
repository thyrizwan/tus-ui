import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TusTableComponent } from './tus-table.component';

describe('TusTableComponent', () => {
  let component: TusTableComponent;
  let fixture: ComponentFixture<TusTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TusTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TusTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
