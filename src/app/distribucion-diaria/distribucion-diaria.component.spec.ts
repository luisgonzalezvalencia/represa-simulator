import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribucionDiariaComponent } from './distribucion-diaria.component';

describe('DistribucionDiariaComponent', () => {
  let component: DistribucionDiariaComponent;
  let fixture: ComponentFixture<DistribucionDiariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistribucionDiariaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistribucionDiariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
