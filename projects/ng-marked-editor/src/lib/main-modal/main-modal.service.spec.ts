import { TestBed } from '@angular/core/testing';

import { MainModalService } from './main-modal.service';

describe('MainModalService', () => {
  let service: MainModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
