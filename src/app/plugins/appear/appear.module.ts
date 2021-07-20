import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppearRoutingModule } from './appear-routing.module';
import { DigitalComponent } from './digital/digital.component';
import { NgDigitalModule } from 'projects/ng-digital/src/public-api';
import { SharedModule } from 'src/app/shared/shared.module';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { ColorPickerModule } from 'projects/color-picker/src/public-api';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DigitalComponent,
    ColorPickerComponent
  ],
  imports: [
    CommonModule,
    AppearRoutingModule,
    NgDigitalModule,
    SharedModule,
    ColorPickerModule,
    FormsModule
  ]
})
export class AppearModule { }
