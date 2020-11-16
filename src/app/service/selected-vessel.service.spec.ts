import { TestBed } from '@angular/core/testing';

import { SelectedVesselService } from './selected-vessel.service';

describe('SelectedVesselService', () => {
  let service: SelectedVesselService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedVesselService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
