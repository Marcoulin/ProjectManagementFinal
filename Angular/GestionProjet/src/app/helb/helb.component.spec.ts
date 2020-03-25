import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HELBComponent } from './helb.component';

describe('HELBComponent', () => {
  let component: HELBComponent;
  let fixture: ComponentFixture<HELBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HELBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HELBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
