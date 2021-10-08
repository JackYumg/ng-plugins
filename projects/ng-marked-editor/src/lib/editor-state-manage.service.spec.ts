import { TestBed } from '@angular/core/testing';

import { EditorStateManageService } from './editor-state-manage.service';

describe('EditorStateManageService', () => {
  let service: EditorStateManageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditorStateManageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
