import { TestBed } from '@angular/core/testing';

import { VesselSelected } from './vessel-selected.service';

describe('VesselToPlayService', () => {
  let service: VesselSelected;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VesselSelected);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
