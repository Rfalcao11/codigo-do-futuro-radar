import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovopedidoComponent } from './novopedido.component';

describe('NovopedidoComponent', () => {
  let component: NovopedidoComponent;
  let fixture: ComponentFixture<NovopedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovopedidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovopedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
