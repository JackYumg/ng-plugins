import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgDigitalPanelComponent } from './ng-digital-panel.component';

describe('NgDigitalPanelComponent', () => {
  let component: NgDigitalPanelComponent;
  let fixture: ComponentFixture<NgDigitalPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgDigitalPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgDigitalPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
