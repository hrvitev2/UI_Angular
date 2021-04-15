import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxExcemptionComponent } from './tax-excemption.component';

describe('TaxExcemptionComponent', () => {
  let component: TaxExcemptionComponent;
  let fixture: ComponentFixture<TaxExcemptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxExcemptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxExcemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
