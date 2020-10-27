import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVesselComponent } from './list-vessel.component';

describe('ListVesselComponent', () => {
  let component: ListVesselComponent;
  let fixture: ComponentFixture<ListVesselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVesselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVesselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
