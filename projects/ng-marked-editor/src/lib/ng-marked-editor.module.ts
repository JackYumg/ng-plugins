import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMarkedEditorComponent } from './ng-marked-editor.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { MdModalComponent } from './md-modal/md-modal.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { LinkUploadComponent } from './link-upload/link-upload.component';
import { MainModalComponent } from './main-modal/main-modal.component';
import { MainModalDirective } from './main-modal/main-modal.directive';
import { MainModalFooterComponent } from './main-modal/main-modal-footer/main-modal-footer.component';
import { TranslatePipe } from './translate.pipe';
import { EditorStorageService } from './editor-storage.service';
import { NgMarkedPreviewModule } from 'projects/ng-marked-preview/src/public-api';
@NgModule({
  declarations: [
    NgMarkedEditorComponent,
    ToolBarComponent,
    MdModalComponent,
    ImageUploadComponent,
    LinkUploadComponent,
    MainModalComponent,
    MainModalDirective,
    MainModalFooterComponent,
    TranslatePipe,
  ],
  imports: [
    NgMarkedPreviewModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    OverlayModule,
    PortalModule
  ],
  exports: [
    NgMarkedPreviewModule,
    NgMarkedEditorComponent,
    TranslatePipe
  ],
  providers: [
    EditorStorageService
  ]
})
export class NgMarkedEditorModule {
  constructor(
    private editorStorageService: EditorStorageService
  ) {
    this.editorStorageService.clearAll();
  }
}
