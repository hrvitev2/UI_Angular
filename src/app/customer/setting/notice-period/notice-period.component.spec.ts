import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticePeriodComponent } from './notice-period.component';

describe('NoticePeriodComponent', () => {
  let component: NoticePeriodComponent;
  let fixture: ComponentFixture<NoticePeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticePeriodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticePeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
