import { TestBed } from '@angular/core/testing';

import { VesselsService } from './vessels.service';

describe('VesselsService', () => {
  let service: VesselsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VesselsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
