import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportVesselFormComponent } from './import-vessel-form.component';

describe('ImportVesselPortComponent', () => {
  let component: ImportVesselFormComponent;
  let fixture: ComponentFixture<ImportVesselFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportVesselFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportVesselFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
