import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ExternalRoomComponent } from './external-room.component'

describe('ExternalRoomComponent', () => {
  let component: ExternalRoomComponent
  let fixture: ComponentFixture<ExternalRoomComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [ExternalRoomComponent],
    teardown: { destroyAfterEach: false }
}).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalRoomComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
