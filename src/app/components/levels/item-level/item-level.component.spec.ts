import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemLevelComponent } from './item-level.component';

describe('ItemLevelComponent', () => {
  let component: ItemLevelComponent;
  let fixture: ComponentFixture<ItemLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
