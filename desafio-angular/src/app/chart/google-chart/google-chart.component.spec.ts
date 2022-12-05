import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleChartComponent } from './google-chart.component';

describe('GoogleChartComponent', () => {
  let component: GoogleChartComponent;
  let fixture: ComponentFixture<GoogleChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
