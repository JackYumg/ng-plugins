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
import { NgMarkedEditorComponent } from './ng-marked-editor/ng-marked-editor.component';
import { NgMarkedEditorModule } from 'projects/ng-marked-editor/src/public-api';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditorStorageService } from 'projects/ng-marked-editor/src/lib/editor-storage.service';
import { NgMarkedPreviewModule } from 'projects/ng-marked-preview/src/public-api';


@NgModule({
  declarations: [
    DigitalComponent,
    ColorPickerComponent,
    MarkdownComponent,
    NgMarkedPreviewComponent,
    NgMarkedEditorComponent,
  ],
  imports: [
    CommonModule,
    AppearRoutingModule,
    NgDigitalModule,
    SharedModule,
    ColorPickerModule,
    NgMarkedPreviewModule,
    NgMarkedEditorModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    EditorStorageService
  ]
})
export class AppearModule {
  constructor(
    private editorStorageService: EditorStorageService
  ) {
    this.editorStorageService.clearAll();
  }
}
