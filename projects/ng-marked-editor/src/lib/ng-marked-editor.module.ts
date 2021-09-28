import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMarkedPreviewModule } from 'projects/ng-marked-preview/src/public-api';
import { NgMarkedEditorComponent } from './ng-marked-editor.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';



@NgModule({
  declarations: [
    NgMarkedEditorComponent,
    ToolBarComponent
  ],
  imports: [
    NgMarkedPreviewModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NgMarkedEditorComponent
  ]
})
export class NgMarkedEditorModule { }
