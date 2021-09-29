import { TestBed } from '@angular/core/testing';

import { EditorOptService } from './editor-opt.service';

describe('EditorOptService', () => {
  let service: EditorOptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditorOptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
