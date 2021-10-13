import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMarkedEditorComponent } from './ng-marked-editor.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MenuDirective } from './menu.directive';
import { MdModalComponent } from './md-modal/md-modal.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { LinkUploadComponent } from './link-upload/link-upload.component';
import { NgMarkedPreviewModule } from 'ng-marked-preview';

@NgModule({
  declarations: [
    NgMarkedEditorComponent,
    ToolBarComponent,
    MenuDirective,
    MdModalComponent,
    ImageUploadComponent,
    LinkUploadComponent,
  ],
  imports: [
    NgMarkedPreviewModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    OverlayModule,
  ],
  exports: [
    NgMarkedEditorComponent,
  ],
  providers: [
  ]
})
export class NgMarkedEditorModule { }
