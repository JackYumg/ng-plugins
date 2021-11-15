import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  fg: FormGroup;
  constructor(
    private fb: FormBuilder
  ) {
    this.fg = this.fb.group({
      text: '# dddd'
    });
  }

  ngOnInit(): void {
  }

  saveChange(value: string): void {
    console.log(value);
  }

}
