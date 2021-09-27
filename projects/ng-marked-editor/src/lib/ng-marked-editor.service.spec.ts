import { TestBed } from '@angular/core/testing';

import { NgMarkedEditorService } from './ng-marked-editor.service';

describe('NgMarkedEditorService', () => {
  let service: NgMarkedEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgMarkedEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
