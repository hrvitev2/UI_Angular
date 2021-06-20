import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryBreakupsComponent } from './salary-breakups.component';

describe('SalaryBreakupsComponent', () => {
  let component: SalaryBreakupsComponent;
  let fixture: ComponentFixture<SalaryBreakupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryBreakupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryBreakupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
