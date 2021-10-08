import { Injectable } from '@angular/core';

// 编辑器的状态
interface EditorState {
  value?: string;
}

@Injectable()
export class EditorStateManageService {

  editorState: EditorState = {};
  stateStacks: EditorState[] = [];
  constructor() { }

  // 存储编辑器每一次的状态
  pushState(editorState: EditorState): void {
    this.editorState = editorState;
    this.stateStacks.push(editorState);
  }

  // 返回每一次的状态
  rollback(): EditorState {
    if (this.stateStacks.length > 0) {
      this.stateStacks.pop();
      this.editorState = this.stateStacks[0] || {};
      return this.editorState;
    }
    return {};
  }
}
