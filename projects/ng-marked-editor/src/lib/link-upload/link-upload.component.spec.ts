import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkUploadComponent } from './link-upload.component';

describe('LinkUploadComponent', () => {
  let component: LinkUploadComponent;
  let fixture: ComponentFixture<LinkUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
