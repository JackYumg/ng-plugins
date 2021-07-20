import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoneycombColorPickerComponent } from './honeycomb-color-picker/honeycomb-color-picker.component';



@NgModule({
  declarations: [
    HoneycombColorPickerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HoneycombColorPickerComponent
  ]
})
export class HoneycombColorPickerModule { }
