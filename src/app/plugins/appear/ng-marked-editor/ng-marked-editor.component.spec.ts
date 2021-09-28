import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgMarkedEditorComponent } from './ng-marked-editor.component';

describe('NgMarkedEditorComponent', () => {
  let component: NgMarkedEditorComponent;
  let fixture: ComponentFixture<NgMarkedEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgMarkedEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgMarkedEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
