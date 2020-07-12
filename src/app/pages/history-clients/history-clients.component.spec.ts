import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { HistoryClientsComponent } from './history-clients.component'

describe('HistoryClientsComponent', () => {
  let component: HistoryClientsComponent
  let fixture: ComponentFixture<HistoryClientsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryClientsComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryClientsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
