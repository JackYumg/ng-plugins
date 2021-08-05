import { TestBed } from '@angular/core/testing';

import { NgEditorMarkdownService } from './ng-editor-markdown.service';

describe('NgEditorMarkdownService', () => {
  let service: NgEditorMarkdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgEditorMarkdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
