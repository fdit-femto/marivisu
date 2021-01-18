import { TestBed } from '@angular/core/testing';

import { TimeSelectedVessel } from './time-selected-vessel.service';

describe('VesselToPlayService', () => {
  let service: TimeSelectedVessel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeSelectedVessel);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
