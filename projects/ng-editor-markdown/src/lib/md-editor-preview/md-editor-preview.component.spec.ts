import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdEditorPreviewComponent } from './md-editor-preview.component';

describe('MdEditorPreviewComponent', () => {
  let component: MdEditorPreviewComponent;
  let fixture: ComponentFixture<MdEditorPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdEditorPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdEditorPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
