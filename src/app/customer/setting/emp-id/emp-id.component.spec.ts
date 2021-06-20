import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpIdComponent } from './emp-id.component';

describe('EmpIdComponent', () => {
  let component: EmpIdComponent;
  let fixture: ComponentFixture<EmpIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
