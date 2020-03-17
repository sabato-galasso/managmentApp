import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcoliciComponent } from './alcolici.component';

describe('AlcoliciComponent', () => {
  let component: AlcoliciComponent;
  let fixture: ComponentFixture<AlcoliciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlcoliciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlcoliciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
