import { TestBed } from '@angular/core/testing';

import { TimeSelected } from './time-selected.service';

describe('VesselToPlayService', () => {
  let service: TimeSelected;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeSelected);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
