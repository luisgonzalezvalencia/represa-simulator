import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuladorAccionComponent } from './simulador-accion.component';

describe('SimuladorAccionComponent', () => {
  let component: SimuladorAccionComponent;
  let fixture: ComponentFixture<SimuladorAccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimuladorAccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimuladorAccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
