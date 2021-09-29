import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgMarkedEditorOption } from '../types/editor';
import { EditorOptService } from './editor-opt.service';
import { NgMarkedEditorService } from './ng-marked-editor.service';

@Component({
  selector: 'lib-ng-marked-editor',
  templateUrl: './ng-marked-editor.html',
  styles: [
  ],
  styleUrls: [
    './styles/ng-marked-editor.component.less'
  ],
  providers: [
    NgMarkedEditorService,
    EditorOptService
  ]
})
export class NgMarkedEditorComponent implements OnInit {
  @Input()
  option: NgMarkedEditorOption = {
    saveOption: {
      autoSave: false,
    }
  };

  ngMarkedEditorRefValue?: ElementRef;
  @ViewChild('ngMarkedEditorTpl')
  set ngMarkedEditorRef(elm: ElementRef) {
    if (elm) {
      this.ngMarkedEditorRefValue = elm;
      this.editorOptService.setElm(elm);
    }
  }

  value = '';

  constructor(
    private ngMarkedEditorService: NgMarkedEditorService,
    private editorOptService: EditorOptService
  ) { }

  ngOnInit(): void {
  }

  toolbarClick($event: any): void {
    let { type } = $event;
    if ((this.editorOptService as any)[type] || (this.editorOptService.fnMap as any)[type]) {
      let excute = (this.editorOptService as any)[type] || (this.editorOptService.fnMap as any)[type];
      if (typeof excute === 'function') {

      } else {
        type = excute;
        excute = (this.editorOptService as any)[type];
      }
      excute();
    }
  }
}
