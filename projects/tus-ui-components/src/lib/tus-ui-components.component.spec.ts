import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TusUiComponentsComponent } from './tus-ui-components.component';

describe('TusUiComponentsComponent', () => {
  let component: TusUiComponentsComponent;
  let fixture: ComponentFixture<TusUiComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TusUiComponentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TusUiComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
