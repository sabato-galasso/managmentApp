import { TestBed } from '@angular/core/testing';

import { SettingsTableService } from './settings-table.service';

describe('SettingsTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SettingsTableService = TestBed.get(SettingsTableService);
    expect(service).toBeTruthy();
  });
});
