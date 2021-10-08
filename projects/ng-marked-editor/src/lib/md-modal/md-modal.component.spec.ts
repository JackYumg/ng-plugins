import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdModalComponent } from './md-modal.component';

describe('MdModalComponent', () => {
  let component: MdModalComponent;
  let fixture: ComponentFixture<MdModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
