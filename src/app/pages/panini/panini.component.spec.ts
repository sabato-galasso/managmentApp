import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaniniComponent } from './panini.component';

describe('PaniniComponent', () => {
  let component: PaniniComponent;
  let fixture: ComponentFixture<PaniniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaniniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaniniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
