import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.less']
})
export class ToolBarComponent implements OnInit {

  @Output()
  clickEvent: EventEmitter<any> = new EventEmitter<any>();
  baseGroup1 = [
    { name: '#icon-bold' },
    { name: '#icon-underline' },
    { name: '#icon-italic' },
    { name: '#icon-strike-through' },
    { name: '#icon-title' },
  ];

  baseGroup2 = [
    { name: '#icon-sub' },
    { name: '#icon-sup' },
    { name: '#icon-quote' },
    { name: '#icon-unordered-list' },
    { name: '#icon-ordered-list' },
  ];

  moreFunction = [
    { name: '#icon-liuchengtu' },
    { name: '#icon-gongshi' }
  ];

  optGroup = [
    { name: '#icon-revoke' },
    { name: '#icon-next' },
    { name: '#icon-baocun' },
  ];

  rightGroup = [
    { name: '#icon-prettier' },
    { name: '#icon-fangda', bakName: '#icon-suoxiao' },
    { name: '#icon-fullScreen', bakName: '#icon-fullScreen-exit' },
    { name: '#icon-preview' },
    { name: '#icon-coding' },
    { name: '#icon-github' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  itemClick(i: any): void {
    const type = i.name.split(/^#[\w]+\-/)[1];
    if (i.bakName) {
      const temp = i.name;
      i.name = i.bakName;
      i.bakName = temp;
    }
    this.clickEvent.emit({ item: i, type });
  }

}
