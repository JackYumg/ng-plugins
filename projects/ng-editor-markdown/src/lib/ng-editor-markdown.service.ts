import { EventEmitter, Injectable } from '@angular/core';

interface ToolBarEvents {
  type: 'bold'
}
@Injectable()
export class NgEditorMarkdownService {

  toolBarEvent: EventEmitter<ToolBarEvents> = new EventEmitter<ToolBarEvents>();
  constructor() { }

  // 提取字符串
  getStrs(context: string) {
    
  }
}
