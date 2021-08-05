import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgEditorMarkdownComponent } from './ng-editor-markdown.component';

describe('NgEditorMarkdownComponent', () => {
  let component: NgEditorMarkdownComponent;
  let fixture: ComponentFixture<NgEditorMarkdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgEditorMarkdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgEditorMarkdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
