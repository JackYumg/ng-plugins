import { Directive, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[md-editor-preview]'
})
export class MdEditorPreviewComponent implements OnInit {

  @Input()
  content: string = '';
  constructor(
  ) { }

  ngOnInit(): void {

  }
}
