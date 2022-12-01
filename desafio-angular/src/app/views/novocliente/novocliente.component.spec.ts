import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoclienteComponent } from './novocliente.component';

describe('NovoclienteComponent', () => {
  let component: NovoclienteComponent;
  let fixture: ComponentFixture<NovoclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoclienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovoclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
