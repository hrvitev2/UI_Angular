import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatecodesComponent } from './statecodes.component';

describe('StatecodesComponent', () => {
  let component: StatecodesComponent;
  let fixture: ComponentFixture<StatecodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatecodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatecodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
