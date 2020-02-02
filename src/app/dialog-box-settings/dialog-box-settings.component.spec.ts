import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxSettingsComponent } from './dialog-box-settings.component';

describe('DialogBoxSettingsComponent', () => {
  let component: DialogBoxSettingsComponent;
  let fixture: ComponentFixture<DialogBoxSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBoxSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
