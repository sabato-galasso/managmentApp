import { TestBed } from '@angular/core/testing';

import { MenuManagerServiceService } from './menu-manager-service.service';

describe('MenuManagerServiceService', () => {
  let service: MenuManagerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuManagerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
