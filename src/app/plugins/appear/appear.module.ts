import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppearRoutingModule } from './appear-routing.module';
import { DigitalComponent } from './digital/digital.component';
import { NgDigitalModule } from 'projects/ng-digital/src/public-api';
import { SharedModule } from 'src/app/shared/shared.module';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { ColorPickerModule } from 'projects/color-picker/src/public-api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownComponent } from './markdown/markdown.component';
import { NgEditorMarkdownModule } from 'projects/ng-editor-markdown/src/public-api';


@NgModule({
  declarations: [
    DigitalComponent,
    ColorPickerComponent,
    MarkdownComponent,
  ],
  imports: [
    CommonModule,
    AppearRoutingModule,
    NgDigitalModule,
    SharedModule,
    ColorPickerModule,
    NgEditorMarkdownModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AppearModule { }
