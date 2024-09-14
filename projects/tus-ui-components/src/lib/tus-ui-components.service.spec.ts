import { TestBed } from '@angular/core/testing';

import { TusUiComponentsService } from './tus-ui-components.service';

describe('TusUiComponentsService', () => {
  let service: TusUiComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TusUiComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
