import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ExtCounterComponent } from './ext-counter.component'

describe('ExtCounterComponent', () => {
  let component: ExtCounterComponent
  let fixture: ComponentFixture<ExtCounterComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ExtCounterComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtCounterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
