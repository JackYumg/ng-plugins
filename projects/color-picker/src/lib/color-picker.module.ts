import { NgModule } from '@angular/core';
import { ColorPickerComponent } from './color-picker.component';
import { HoneycombColorPickerModule } from './honeycomb-color-picker/honeycomb-color-picker.module';



@NgModule({
  declarations: [
    ColorPickerComponent
  ],
  imports: [
    HoneycombColorPickerModule
  ],
  exports: [
    ColorPickerComponent,
    HoneycombColorPickerModule
  ]
})
export class ColorPickerModule { }
