import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgEditorMarkdownComponent } from './ng-editor-markdown.component';
import { MdEditorToolbarComponent } from './md-editor-toolbar/md-editor-toolbar.component';



@NgModule({
  declarations: [
    NgEditorMarkdownComponent,
    MdEditorToolbarComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    NgEditorMarkdownComponent
  ]
})
export class NgEditorMarkdownModule { }
