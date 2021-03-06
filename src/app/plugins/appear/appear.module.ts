import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppearRoutingModule } from './appear-routing.module';
import { DigitalComponent } from './digital/digital.component';
import { NgDigitalModule } from 'projects/ng-digital/src/public-api';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { ColorPickerModule } from 'projects/color-picker/src/public-api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownComponent } from './markdown/markdown.component';
import { NgMarkedPreviewComponent } from './ng-marked-preview/ng-marked-preview.component';
import { NgMarkedEditorViewComponent } from './ng-marked-editor/ng-marked-editor.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { NgMarkedEditorModule } from 'projects/ng-marked-editor/src/public-api';

@NgModule({
  declarations: [
    DigitalComponent,
    ColorPickerComponent,
    MarkdownComponent,
    NgMarkedPreviewComponent,
    NgMarkedEditorViewComponent,
  ],
  imports: [
    CommonModule,
    AppearRoutingModule,
    NgDigitalModule,
    SharedModule,
    ColorPickerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgMarkedEditorModule
  ],
  exports: [
    NgMarkedEditorModule
  ],
  providers: [
  ]
})
export class AppearModule {
  constructor(
  ) {

  }
}
