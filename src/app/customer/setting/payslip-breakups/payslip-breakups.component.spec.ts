import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayslipBreakupsComponent } from './payslip-breakups.component';

describe('PayslipBreakupsComponent', () => {
  let component: PayslipBreakupsComponent;
  let fixture: ComponentFixture<PayslipBreakupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayslipBreakupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayslipBreakupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
