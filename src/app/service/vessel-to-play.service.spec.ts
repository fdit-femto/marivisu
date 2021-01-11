import { TestBed } from '@angular/core/testing';

import { VesselToPlayService } from './vessel-to-play.service';

describe('VesselToPlayService', () => {
  let service: VesselToPlayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VesselToPlayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
