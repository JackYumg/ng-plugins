import { TestBed } from '@angular/core/testing';

import { StringfiyService } from './stringfiy.service';

describe('StringfiyService', () => {
  let service: StringfiyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringfiyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
