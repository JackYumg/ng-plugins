import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdEditorToolbarComponent } from './md-editor-toolbar.component';

describe('MdEditorToolbarComponent', () => {
  let component: MdEditorToolbarComponent;
  let fixture: ComponentFixture<MdEditorToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdEditorToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdEditorToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
