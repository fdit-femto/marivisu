import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportVesselPortComponent } from './import-vessel-port.component';

describe('ImportVesselPortComponent', () => {
  let component: ImportVesselPortComponent;
  let fixture: ComponentFixture<ImportVesselPortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportVesselPortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportVesselPortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
