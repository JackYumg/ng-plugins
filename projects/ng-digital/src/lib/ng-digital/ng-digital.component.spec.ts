import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgDigitalComponent } from './ng-digital.component';

describe('NgDigitalComponent', () => {
  let component: NgDigitalComponent;
  let fixture: ComponentFixture<NgDigitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgDigitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgDigitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
