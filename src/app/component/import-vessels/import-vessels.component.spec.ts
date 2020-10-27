import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportVesselsComponent } from './import-vessels.component';

describe('ImportVesselsComponent', () => {
  let component: ImportVesselsComponent;
  let fixture: ComponentFixture<ImportVesselsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportVesselsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportVesselsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
