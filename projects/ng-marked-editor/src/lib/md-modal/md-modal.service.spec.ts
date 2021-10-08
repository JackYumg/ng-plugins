import { TestBed } from '@angular/core/testing';

import { MdModalService } from './md-modal.service';

describe('MdModalService', () => {
  let service: MdModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MdModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
