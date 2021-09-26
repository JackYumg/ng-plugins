import { TestBed } from '@angular/core/testing';

import { NgMarkedPreviewService } from './ng-marked-preview.service';

describe('NgMarkedPreviewService', () => {
  let service: NgMarkedPreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgMarkedPreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
