import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsPeriodComponent } from './maps-period.component';

describe('MapsPeriodComponent', () => {
  let component: MapsPeriodComponent;
  let fixture: ComponentFixture<MapsPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapsPeriodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
