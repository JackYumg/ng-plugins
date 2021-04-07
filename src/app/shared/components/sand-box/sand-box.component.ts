import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NzCodeEditorComponent } from 'ng-zorro-antd/code-editor';
import { NzTabChangeEvent } from 'ng-zorro-antd/tabs';
import { FileItem } from './sand-box-meta';

@Component({
  selector: 'app-sand-box',
  templateUrl: './sand-box.component.html',
  styleUrls: ['./sand-box.component.less']
})
export class SandBoxComponent implements OnInit {

  code = `import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor'`;
  @Input()
  fileList: FileItem[] = [];
  @ViewChild('codeEditorTpl', { static: false })
  codeEditorRef!: NzCodeEditorComponent;
  checkItem!: FileItem;
  codeExpand = false;
  constructor() { }

  ngOnInit(): void {
    this.checkItem = this.fileList[0];
  }

  tabIndexChange($event: NzTabChangeEvent) {
    const index: any = $event.index;
    this.checkItem = this.fileList[index];
    this.codeEditorRef.layout();
  }

  expand() {
    this.codeExpand = !this.codeExpand;
    this.codeEditorRef.layout();
  }
}
