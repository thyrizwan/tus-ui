import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TusDialCodeComponent } from './tus-dial-code.component';

describe('TusDialCodeComponent', () => {
  let component: TusDialCodeComponent;
  let fixture: ComponentFixture<TusDialCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TusDialCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TusDialCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
