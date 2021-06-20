import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaManagementComponent } from './ta-management.component';

describe('TaManagementComponent', () => {
  let component: TaManagementComponent;
  let fixture: ComponentFixture<TaManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
