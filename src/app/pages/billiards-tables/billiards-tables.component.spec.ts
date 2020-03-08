import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilliardsTablesComponent } from './billiards-tables.component';

describe('BilliardsTablesComponent', () => {
  let component: BilliardsTablesComponent;
  let fixture: ComponentFixture<BilliardsTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilliardsTablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilliardsTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
