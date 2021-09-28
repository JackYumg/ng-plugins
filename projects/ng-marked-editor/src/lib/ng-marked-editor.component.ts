import { Component, Input, OnInit } from '@angular/core';
import { NgMarkedEditorOption } from '../types/editor';

@Component({
  selector: 'lib-ng-marked-editor',
  templateUrl: './ng-marked-editor.html',
  styles: [
  ],
  styleUrls: [
    './styles/ng-marked-editor.component.less'
  ]
})
export class NgMarkedEditorComponent implements OnInit {
  @Input()
  option: NgMarkedEditorOption = {
    saveOption: {
      autoSave: false,
    }
  };

  value = '';

  constructor() { }

  ngOnInit(): void {
  }

}
