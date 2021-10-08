import { ElementRef, Injectable } from '@angular/core';
import * as prettier from 'prettier';
import * as plugins from 'prettier/parser-markdown';
import { MdSelection, ResTrans } from '../types/editor';
@Injectable()
export class EditorOptService {

  private elm?: ElementRef;
  state = {
    zoom: false,
    full: false,
    preview: true,
    code: false
  };
  fnMap = {
    'fullScreen-exit': 'fullScreenExit',
    'eye-close': 'eyeClose'
  };

  private titleMap = [
    '',
    '一级标题',
    '二级标题',
    '三级标题',
    '四级标题',
    '五级标题',
    '六级标题',
  ];

  constructor() { }

  setElm(elm: ElementRef): void {
    this.elm = elm;
  }

  // 全屏与退出全屏
  fullScreen = (): void => {
    const element: any = this.elm?.nativeElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }
  }

  // 推出全屏
  fullScreenExit = (): void => {
    const element: any = document;
    if (element.exitFullscreen) {
      element.exitFullscreen();
    } else if (element.msExitFullscreen) {
      element.msExitFullscreen();
    } else if (element.mozCancelFullScreen) {
      element.mozCancelFullScreen();
    } else if (element.webkitExitFullscreen) {
      element.webkitExitFullscreen();
    }
  }

  // 格式化代码
  prettier = (value: string = ''): string => {
    return prettier.format(value, { semi: false, parser: 'markdown', plugins: [plugins] });
  }

  // 放大
  fangda = () => {
    this.state = { ...this.state, zoom: true };
    return this.state;
  }

  // 缩小
  suoxiao = () => {
    this.state = { ...this.state, zoom: false };
    return this.state;
  }

  // 表示当前是close，需要切换到preview去
  eyeClose = () => {
    this.state = { ...this.state, preview: true, code: false };
    return this.state;
  }

  // 表示当前是preview，需要切换到close去
  preview = () => {
    this.state = { ...this.state, preview: false, code: false };
    return this.state;
  }

  // 代码或者预览
  coding = () => {
    this.state = { ...this.state, code: !this.state.code };
    return this.state;
  }


  // 粗体
  bold(text: string, selection: MdSelection): ResTrans {
    let value = '';
    let selectStart = 0;
    let selectEnd = 0;
    if (selection.text) {
      value = `${text.substring(0, selection.index)}**${selection.text}**${text.substring(selection.index + selection.text.length, text.length)}`;
      selectStart = selection.index + 2;
      selectEnd = selectStart + selection.text.length;
    } else {
      value = `${text.substring(0, selection.index)}**加粗**${text.substring(selection.index, text.length)}`;
      selectStart = selection.index + 2;
      selectEnd = selectStart + 2;
    }
    return {
      value,
      selectStart,
      selectEnd
    };
  }

  // 斜体
  italic(text: string, selection: MdSelection): ResTrans {
    let value = '';
    let selectStart = 0;
    let selectEnd = 0;
    if (selection.text) {
      value = `${text.substring(0, selection.index)}*${selection.text}*${text.substring(selection.index + selection.text.length, text.length)}`;
      selectStart = selection.index + 1;
      selectEnd = selectStart + selection.text.length;
    } else {
      value = `${text.substring(0, selection.index)}*斜体*${text.substring(selection.index, text.length)}`;
      selectStart = selection.index + 1;
      selectEnd = selectStart + 2;
    }
    return {
      value,
      selectStart,
      selectEnd
    };
  }

  // 划去
  through(text: string, selection: MdSelection): ResTrans {
    let value = '';
    let selectStart = 0;
    let selectEnd = 0;
    if (selection.text) {
      value = `${text.substring(0, selection.index)}~${selection.text}~${text.substring(selection.index + selection.text.length, text.length)}`;
      selectStart = selection.index + 1;
      selectEnd = selectStart + selection.text.length;
    } else {
      value = `${text.substring(0, selection.index)}~划去~${text.substring(selection.index, text.length)}`;
      selectStart = selection.index + 1;
      selectEnd = selectStart + 2;
    }
    return {
      value,
      selectStart,
      selectEnd
    };
  }

  // 下划线
  underline(text: string, selection: MdSelection): ResTrans {
    let value = '';
    let selectStart = 0;
    let selectEnd = 0;
    if (selection.text) {
      value = `${text.substring(0, selection.index)}<u>${selection.text}</u>${text.substring(selection.index + selection.text.length, text.length)}`;
      selectStart = selection.index + 3;
      selectEnd = selectStart + selection.text.length;
    } else {
      value = `${text.substring(0, selection.index)}<u>下划线</u>${text.substring(selection.index, text.length)}`;
      selectStart = selection.index + 3;
      selectEnd = selectStart + 3;
    }
    return {
      value,
      selectStart,
      selectEnd
    };
  }

  // 下标
  sub(text: string, selection: MdSelection): ResTrans {
    let value = '';
    let selectStart = 0;
    let selectEnd = 0;
    if (selection.text) {
      value = `${text.substring(0, selection.index)}<sub>${selection.text}</sub>${text.substring(selection.index + selection.text.length, text.length)}`;
      selectStart = selection.index + 5;
      selectEnd = selectStart + selection.text.length;
    } else {
      value = `${text.substring(0, selection.index)}<sub>下标</sub>${text.substring(selection.index, text.length)}`;
      selectStart = selection.index + 5;
      selectEnd = selectStart + 2;
    }
    return {
      value,
      selectStart,
      selectEnd
    };
  }
  // 下标
  sup(text: string, selection: MdSelection): ResTrans {
    let value = '';
    let selectStart = 0;
    let selectEnd = 0;
    if (selection.text) {
      value = `${text.substring(0, selection.index)}<sup>${selection.text}</sup>${text.substring(selection.index + selection.text.length, text.length)}`;
      selectStart = selection.index + 5;
      selectEnd = selectStart + selection.text.length;
    } else {
      value = `${text.substring(0, selection.index)}<sup>上标</sup>${text.substring(selection.index, text.length)}`;
      selectStart = selection.index + 5;
      selectEnd = selectStart + 2;
    }
    return {
      value,
      selectStart,
      selectEnd
    };
  }

  // 引用
  quote(text: string, selection: MdSelection): ResTrans {
    let value = '';
    let selectStart = 0;
    let selectEnd = 0;
    const arrs = text.split('\n');
    if (arrs[selection.rowNum - 1] || arrs[selection.rowNum - 1] === '') {
      arrs[selection.rowNum - 1] = `>${arrs[selection.rowNum - 1]}`;
    }
    value = arrs.join('\n');
    return {
      value,
      selectStart,
      selectEnd
    };
  }

  // 标题
  title(text: string, selection: MdSelection, level: number): ResTrans {
    const arrs = text.split('\n');
    let selectStart = level;
    let selectEnd = 0;
    if (arrs[selection.rowNum - 1]) {
      arrs[selection.rowNum - 1] = `${'#'.repeat(level)} ${arrs[selection.rowNum - 1]}`;
      arrs.forEach((e, index) => {
        index += 1;
        if (index < selection.rowNum) {
          selectStart += e.length + 1 + level + 1;
        }
      });
      selectEnd += selectStart + arrs[selection.rowNum - 1].length + 1;
    } else if (arrs[selection.rowNum - 1] === '') {
      arrs[selection.rowNum - 1] = `${'#'.repeat(level)} ${this.titleMap[level]}`;
      arrs.forEach((e, index) => {
        index += 1;
        if (index === selection.rowNum) {
          selectStart +=  1;
        }
      });
      selectEnd += selectStart + 4;
    }
    const value = arrs.join('\n');

    return {
      value,
      selectStart,
      selectEnd
    };
  }
}