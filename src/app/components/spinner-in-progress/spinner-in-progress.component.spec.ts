import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerInProgressComponent } from './spinner-in-progress.component';

describe('SpinnerInProgressComponent', () => {
  let component: SpinnerInProgressComponent;
  let fixture: ComponentFixture<SpinnerInProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [SpinnerInProgressComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
