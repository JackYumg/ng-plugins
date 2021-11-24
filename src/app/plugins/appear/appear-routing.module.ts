import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { DigitalComponent } from './digital/digital.component';
import { MarkdownComponent } from './markdown/markdown.component';
import { NgMarkedEditorViewComponent } from './ng-marked-editor/ng-marked-editor.component';
import { NgMarkedPreviewComponent } from './ng-marked-preview/ng-marked-preview.component';

const routes: Routes = [
  { path: '', redirectTo: 'digital', pathMatch: 'full' },
  { path: 'digital', component: DigitalComponent },
  { path: 'color-picker', component: ColorPickerComponent },
  { path: 'markdown', component: MarkdownComponent },
  { path: 'marked', component: NgMarkedPreviewComponent },
  { path: 'markdown-editor' , component: NgMarkedEditorViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppearRoutingModule { }
