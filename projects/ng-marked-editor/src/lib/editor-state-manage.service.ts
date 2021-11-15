import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

// 编辑器的状态
interface EditorState {
  value?: string;
}

@Injectable()
export class EditorStateManageService {

  editorState: EditorState = {};
  stateStacks: EditorState[] = [];
  yStacks: EditorState[] = [];
  toolEvent: EventEmitter<any> = new EventEmitter();
  constructor() { }

  // 存储编辑器每一次的状态
  pushState(editorState: EditorState): void {
    if (this.editorState.value === editorState.value) {
      // do nothing
    } else {
      this.editorState = editorState;
      this.stateStacks.push(editorState);
    }
  }

  // 返回每一次的状态
  rollback(): EditorState | null {
    if (this.stateStacks.length > 0) {
      const item = this.stateStacks.pop() || { value: '' };
      this.yStacks.push(item);
      this.editorState = this.stateStacks[this.stateStacks.length - 1] || {};
      return this.editorState;
    }
    return null;
  }

  // next操作
  rollInvoke(): EditorState | null {
    if (this.yStacks.length > 0) {
      const state = this.yStacks.pop() || { value: '' };
      this.stateStacks.push(state);
      return state;
    } else {
      return null;
    }
  }

  // 清除
  clear(): void {
    this.stateStacks = [];
  }
  // 清除
  clearY(): void {
    this.yStacks = [];
  }

  // 判断是否可以撤销
  hasPre(): boolean {
    return this.stateStacks.length > 0;
  }

  // 判断是否可以回滚
  hasNext(): boolean {
    return this.yStacks.length > 0;
  }

  // 判断是否为可输入文本（）
  // ts-dsiabled
  isInputText(iKey: number): boolean {
    if (iKey === 32 || iKey === 229) {
      return true;
    } /*空格和异常*/
    if (iKey > 47 && iKey < 58) {
      return true;
    } /*数字*/
    if (iKey > 64 && iKey < 91) {
      return true;
    } /*字母*/
    if (iKey > 95 && iKey < 108) {
      return true;
    } /*数字键盘1*/
    if (iKey > 108 && iKey < 112) {
      return true;
    } /*数字键盘2*/
    if (iKey > 185 && iKey < 193) {
      return true;
    } /*符号1*/
    if (iKey > 218 && iKey < 223) {
      return true;
    } /*符号2*/
    return false;
  }
}
