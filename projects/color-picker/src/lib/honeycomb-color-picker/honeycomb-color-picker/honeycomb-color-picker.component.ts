import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'honeycomb-color-picker',
  templateUrl: './honeycomb-color-picker.component.html',
  styleUrls: ['./honeycomb-color-picker.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HoneycombColorPickerComponent implements OnInit , OnDestroy {

  constructor() { }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

}
