import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoneycombColorPickerComponent } from './honeycomb-color-picker.component';

describe('HoneycombColorPickerComponent', () => {
  let component: HoneycombColorPickerComponent;
  let fixture: ComponentFixture<HoneycombColorPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoneycombColorPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoneycombColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
