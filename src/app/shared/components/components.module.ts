import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SandBoxComponent } from './sand-box/sand-box.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import { EditOutline } from '@ant-design/icons-angular/icons';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { FormsModule } from '@angular/forms';

const icons: IconDefinition[] = [EditOutline];

@NgModule({
  declarations: [
    SandBoxComponent
  ],
  imports: [
    CommonModule,
    NzIconModule.forChild(icons),
    NzCodeEditorModule,
    NzTabsModule,
    FormsModule
  ],
  exports: [
    SandBoxComponent
  ]
})
export class ComponentsModule { }
