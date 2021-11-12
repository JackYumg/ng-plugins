import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainModalFooterComponent } from './main-modal-footer.component';

describe('MainModalFooterComponent', () => {
  let component: MainModalFooterComponent;
  let fixture: ComponentFixture<MainModalFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainModalFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainModalFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
