import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaccodesComponent } from './saccodes.component';

describe('SaccodesComponent', () => {
  let component: SaccodesComponent;
  let fixture: ComponentFixture<SaccodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaccodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaccodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
