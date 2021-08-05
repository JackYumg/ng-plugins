import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'md-editor-toolbar',
  templateUrl: './md-editor-toolbar.component.html',
  styleUrls: ['./md-editor-toolbar.component.less'],
})
export class MdEditorToolbarComponent implements OnInit {

  @Input()
  tools: string[] = ['H'];
  toolIconsPath = './../../assets/svg/editor/b.svg';
  constructor() { }
  
  ngOnInit(): void {
  }

}
