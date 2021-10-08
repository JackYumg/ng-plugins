import { TestBed } from '@angular/core/testing';

import { ToolBarService } from './tool-bar.service';

describe('ToolBarService', () => {
  let service: ToolBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
