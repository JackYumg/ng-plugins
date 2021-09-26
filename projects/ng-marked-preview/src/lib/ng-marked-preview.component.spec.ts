import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgMarkedPreviewComponent } from './ng-marked-preview.component';

describe('NgMarkedPreviewComponent', () => {
  let component: NgMarkedPreviewComponent;
  let fixture: ComponentFixture<NgMarkedPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgMarkedPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgMarkedPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
