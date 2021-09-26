import { TestBed } from '@angular/core/testing';

import { MarkBaseService } from './mark-base.service';

describe('MarkBaseService', () => {
  let service: MarkBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
