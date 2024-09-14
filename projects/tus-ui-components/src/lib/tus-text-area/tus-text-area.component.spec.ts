import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TusTextAreaComponent } from './tus-text-area.component';

describe('TusTextAreaComponent', () => {
  let component: TusTextAreaComponent;
  let fixture: ComponentFixture<TusTextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TusTextAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TusTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
