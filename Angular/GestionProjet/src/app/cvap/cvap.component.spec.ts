import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CVAPComponent } from './cvap.component';

describe('CVAPComponent', () => {
  let component: CVAPComponent;
  let fixture: ComponentFixture<CVAPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CVAPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CVAPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
