import { TestBed } from '@angular/core/testing';

import { NgDigitalService } from './ng-digital.service';

describe('NgDigitalService', () => {
  let service: NgDigitalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgDigitalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
