import { EventEmitter, Injectable } from '@angular/core';

interface ToolBarEvents {
  type: 'bold' | 'header' | 'italtc',
  value?: any;
}
@Injectable()
export class NgEditorMarkdownService {

  toolBarEvent: EventEmitter<ToolBarEvents> = new EventEmitter<ToolBarEvents>();
  keyborderEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  // 提取字符串
  getStrs(context: string) {

  }

  render(tagName: string, context: string) {

  }

  renderP(context: string) {
    
  }
}
