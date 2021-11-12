import { Component, OnInit } from '@angular/core';
import { NgMarkedEditorOption } from 'projects/ng-marked-editor/src/lib/types/editor';

@Component({
  selector: 'app-ng-marked-editor',
  templateUrl: './ng-marked-editor.component.html',
  styleUrls: ['./ng-marked-editor.component.less']
})
export class NgMarkedEditorComponent implements OnInit {

  option: NgMarkedEditorOption = {
    saveOption: {
      autoSave: true
    }
  };
  constructor() { }

  ngOnInit(): void {
  }

}
