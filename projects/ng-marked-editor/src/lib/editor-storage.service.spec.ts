import { TestBed } from '@angular/core/testing';

import { EditorStorageService } from './editor-storage.service';

describe('EditorStorageService', () => {
  let service: EditorStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditorStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
