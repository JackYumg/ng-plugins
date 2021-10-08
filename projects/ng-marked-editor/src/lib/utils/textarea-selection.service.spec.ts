import { TestBed } from '@angular/core/testing';

import { TextareaSelectionService } from './textarea-selection.service';

describe('TextareaSelectionService', () => {
  let service: TextareaSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextareaSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
