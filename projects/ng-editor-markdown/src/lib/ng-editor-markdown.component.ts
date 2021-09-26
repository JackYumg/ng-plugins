import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, NgZone, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, Subscription } from 'rxjs';
import { THEME_MODE } from '../core/datas';
import { NgEditorMarkdownService } from './ng-editor-markdown.service';
import { MarkdownHelper } from '../util/helper';
import { StringfiyService } from '../util/stringfiy.service';
import { olistExp, ulistExp } from '../core/datas/rgeexp';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ng-editor-markdown',
  templateUrl: './ng-editor-markdown.component.html',
  styles: [
  ],
  styleUrls: ['./ng-editor-markdown.component.less'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: NgEditorMarkdownComponent, multi: true }],
})
export class NgEditorMarkdownComponent implements OnChanges, OnDestroy, ControlValueAccessor {

  // 选项,只用来初始化编辑器,期间有改变的都不能作为其中的配置
  @Input()
  option = {};

  @Input()
  theme: THEME_MODE = THEME_MODE.DEFAULT;

  isWorking = false;

  _value: string | undefined;
  set value(value: string) {
    this._value = value;

    if (this._editorFrammeRef?.nativeElement) {
      this.selectRow = this.markdownHelper.getTextAreaRowNum(this._editorFrammeRef?.nativeElement);
      this.selectIndex = this.markdownHelper.getTextAreaPos(this._editorFrammeRef?.nativeElement);
      this.cdk.detectChanges();
    }
    this.cdk.markForCheck();
  }

  get value(): string {
    return this._value || '';
  }

  constructor(
    private cdk: ChangeDetectorRef,
    private ngEditorMarkdownService: NgEditorMarkdownService,
    private markdownHelper: MarkdownHelper,
    private stringfiyService: StringfiyService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.cdk.detectChanges();
  }

  writeValue(obj: any): void {
    this.value = (obj || '').toString();
  }

  // ------------------------------与原生表单相关
  // 占位符
  // tslint:disable-next-line: variable-name
  private _onChange?: (value: string | null) => void;
  // tslint:disable-next-line: variable-name
  private _onTouched?: () => void;

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.cdk.markForCheck();
  }

  // 编辑框事件处理

  eventBus: { [key: string]: Subscription | null } = {
    focus: null,
    bulr: null,
    keydown: null,
    keyup: null
  };

  // 编辑框
  _editorFrammeRef: ElementRef | undefined;
  @ViewChild('editorFrammeTpl')
  set editorFrammeRef(elem: ElementRef) {
    this._editorFrammeRef = elem;
    if (elem) {
      this.eventBus.focus = fromEvent(this._editorFrammeRef.nativeElement, 'focus').subscribe((res) => {
        this.isWorking = true;
      });
      this.eventBus.bulr = fromEvent(this._editorFrammeRef.nativeElement, 'bulr').subscribe((res) => {
        this.isWorking = false;
      });

      this.eventBus.keyup = fromEvent(this._editorFrammeRef.nativeElement, 'keyup').subscribe(() => {
        this.selectRow = this.markdownHelper.getTextAreaRowNum(this._editorFrammeRef?.nativeElement);
        this.cdk.detectChanges();
      });

      this.eventBus.mousedown = fromEvent(this._editorFrammeRef.nativeElement, 'mouseup').subscribe((res) => {
        this.selectRow = this.markdownHelper.getTextAreaRowNum(this._editorFrammeRef?.nativeElement);
        this.selectIndex = this.markdownHelper.getTextAreaPos(this._editorFrammeRef?.nativeElement);
        this.cdk.detectChanges();
      });

      this.eventBus.keydown = fromEvent(this._editorFrammeRef.nativeElement, 'keydown').subscribe((event: any) => {
        const selectRow = this.markdownHelper.getTextAreaRowNum(this._editorFrammeRef?.nativeElement);
        const idnex = this.markdownHelper.getTextAreaPos(this._editorFrammeRef?.nativeElement);
        const d = this.value?.split('\n') || [];
        if (event.keyCode === 13) {
          this.autoBuildList(d, selectRow - 1, idnex);
        }
      });

      this.subscribeToolEvent();
    }
  }

  // 自动补全
  autoBuildList(strs: string[], index: number, pos: number): string {
    let isBQ = false;
    let count = 1;
    if (strs[index] && olistExp.test(strs[index])) {
      const temp = strs[index] || '';
      let str = (temp.match(/^[0-9]+\.\s+/) as any)[0] || '';
      str = `\n${Number(str - 0 + 1)}. `;
      const resstr = `${this.value.substring(0, pos)}${str}${this.value.substring(pos)}`;
      this.value = resstr;
      this.moveCursor(pos + str.length);
    }

    if (ulistExp.test(strs[index])) {
      strs[index + 1] = `- `;
      isBQ = true;
      count += 2;
    }
    if (isBQ) {
      this.value = strs.join('\n');
      this.moveCursor(pos + count);
    }
    return strs.join('\n');
  }

  // 贯标位置移动
  moveCursor(pis: number): void {
    const e: HTMLTextAreaElement = this._editorFrammeRef?.nativeElement;
    e.blur();
    setTimeout(() => {
      e.setSelectionRange(pis + 3, pis);
      e.focus();
    }, 0);
  }
  // 选中文本
  selectText(start: number, end: number): void {
    const e: HTMLTextAreaElement = this._editorFrammeRef?.nativeElement;
    e.select();
    e.selectionEnd = end;
    e.selectionStart = start;
  }

  _lineNumElmRef: ElementRef | undefined;
  @ViewChild('lineNumElm')
  set lineNumElmRef(elm: ElementRef) {
    this._lineNumElmRef = elm;
    this.subscribeLineNumEvent();
  }

  selectRow = 0;
  selectIndex = 0;
  subscribeToolEvent() {
    this.ngEditorMarkdownService.toolBarEvent.subscribe(({ type, value }) => {
      if (value) {
        switch (type) {
          case 'bold': // 点击了加粗
            const [startB, endB] = this.addBold();
            setTimeout(() => {
              this.selectText(startB, endB);
            }, 100);
            break;
          case 'header':
            const [start, end] = this.addHeader(value);
            setTimeout(() => {
              this.selectText(start, end);
            }, 100);
            break;
          case 'italtc':
            this.addItaltc();
            break;
          default:
            break;
        }
      }
    });
  }

  lineCount = 0;
  numberCount: number[] = [];
  subscribeLineNumEvent() {
    this.ngEditorMarkdownService.lineNumEvent.subscribe((splitLines: string[]) => {
      const textarea: HTMLTextAreaElement = this._editorFrammeRef?.nativeElement;
      let num = 0;
      this.numberCount = [];
      for (let i = 0; i < splitLines.length; i++) {
        const count = this.markdownHelper.getTextLinenum(splitLines[i], textarea);
        num += count;
      }
      for (let i = 0; i < num; i++) {
        this.numberCount.push(i + 1);
      }
      this.cdk.detectChanges();
    });

    if (this._lineNumElmRef) {
      this.eventBus.scrool = fromEvent(this._editorFrammeRef?.nativeElement, 'scroll').subscribe((res: any) => {
        if (this._lineNumElmRef) {
          this._lineNumElmRef.nativeElement.scrollTop = res.srcElement.scrollTop;
        }
      });
    }
  }

  addBold(): number[] {
    const selected = this.markdownHelper.getSelected(this._editorFrammeRef?.nativeElement);
    const pos = this.selectIndex || 0;
    if (selected) {

    } else {
      this.value = this.value.substring(0, pos) + '**粗体**' + this.value.substring(pos);
      return [pos + 2, pos + 4];
    }
    return [];
  }

  addItaltc() {

  }


  addHeader(value: number): number[] {
    const selected = this.markdownHelper.getSelected(this._editorFrammeRef?.nativeElement);
    const pos = this.selectIndex || 0;
    const splited = this.value?.split('\n') || [];
    let lineCount = 0;
    let count = 0;
    for (const str of splited) {
      if (lineCount <= pos && pos <= (lineCount + str.length)) {
        splited[count] = `${'#'.repeat(value)} ${str || '标题'}`;
        this.value = splited.join('\n');
        break;
      } else if (lineCount < pos) {
        lineCount += str.length || 1;
        if (pos === lineCount) {
          splited[count] = `${'\n#'.repeat(value)} 标题\n`;
          this.value = splited.join('\n');
          break;
        }
      }
      count++;
    }
    console.log(lineCount);
    if (!selected) {
      const res = this.value?.substring(0, pos) + '#'.repeat(value) + ' 标题' + this.value?.substring(35);
      return [pos + '#'.repeat(value).length + 1, pos + '#'.repeat(value).length + 3];
    } else {
      return [];
    }
  }

  ngOnDestroy() {

  }
}
