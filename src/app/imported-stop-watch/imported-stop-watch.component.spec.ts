import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ImportedStopWatchComponent } from './imported-stop-watch.component'

describe('ImportedStopWatchComponent', () => {
  let component: ImportedStopWatchComponent
  let fixture: ComponentFixture<ImportedStopWatchComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportedStopWatchComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportedStopWatchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
