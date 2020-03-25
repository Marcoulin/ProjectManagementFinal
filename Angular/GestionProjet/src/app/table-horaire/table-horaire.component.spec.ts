import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHoraireComponent } from './table-horaire.component';

describe('TableHoraireComponent', () => {
  let component: TableHoraireComponent;
  let fixture: ComponentFixture<TableHoraireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableHoraireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableHoraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
