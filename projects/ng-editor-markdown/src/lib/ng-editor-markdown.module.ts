import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgEditorMarkdownComponent } from './ng-editor-markdown.component';
import { MdEditorToolbarComponent } from './md-editor-toolbar/md-editor-toolbar.component';
import { MdEditorPreviewComponent } from './md-editor-preview/md-editor-preview.component';
import { NgEditorMarkdownService } from './ng-editor-markdown.service';
import {OverlayModule} from '@angular/cdk/overlay';



@NgModule({
  declarations: [
    NgEditorMarkdownComponent,
    MdEditorToolbarComponent,
    MdEditorPreviewComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    OverlayModule
  ],
  exports: [
    NgEditorMarkdownComponent,
    MdEditorPreviewComponent
  ],
  providers: [
    NgEditorMarkdownService,
  ]
})
export class NgEditorMarkdownModule { }
