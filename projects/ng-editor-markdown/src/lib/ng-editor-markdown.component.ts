import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, NgZone, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, Subscription } from 'rxjs';
import { THEME_MODE } from '../core/datas';
import { NgEditorMarkdownService } from './ng-editor-markdown.service';
import { MarkdownHelper } from '../util/helper';
import { StringfiyService } from '../util/stringfiy.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ng-editor-markdown',
  templateUrl: './ng-editor-markdown.component.html',
  styles: [
  ],
  styleUrls: ['./ng-editor-markdown.component.less', './../core/styles/default.css'],
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
  set value(value: string | undefined) {
    this._value = value;
    this.cdk.markForCheck();
  }

  get value(): string | undefined {
    return this._value;
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
  }

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

      this.eventBus.keydown = fromEvent(this._editorFrammeRef.nativeElement, 'keyup').subscribe(() => {
        this.selectRow = this.markdownHelper.getTextAreaRowNum(this._editorFrammeRef?.nativeElement);
        this.cdk.detectChanges();
      });

      this.eventBus.mousedown = fromEvent(this._editorFrammeRef.nativeElement, 'mouseup').subscribe((res) => {
        this.selectRow = this.markdownHelper.getTextAreaRowNum(this._editorFrammeRef?.nativeElement);
        this.cdk.detectChanges();
      });

      this.subscribeToolEvent();
    }
  }

  _lineNumElmRef: ElementRef | undefined;
  @ViewChild('lineNumElm')
  set lineNumElmRef(elm: ElementRef) {
    this._lineNumElmRef = elm;
    this.subscribeLineNumEvent();
  }

  selectRow = 0;

  subscribeToolEvent() {
    this.ngEditorMarkdownService.toolBarEvent.subscribe(({ type, value }) => {
      if (value) {
        switch (type) {
          case 'bold': // 点击了加粗
            this.addBold();
            break;
          case 'header':
            this.addHeader(value);
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

  addBold() {

  }

  addItaltc() {

  }


  addHeader(value: number) {
    const selected = this.markdownHelper.getSelected(this._editorFrammeRef?.nativeElement);
    const pos = this.markdownHelper.getTextAreaPos(this._editorFrammeRef?.nativeElement);
    const splited = this.value?.split('\n') || [];
    let lineCount = 0;
    let beforeStr: string = '';
    for (const str of splited) {
      if (lineCount < pos) {
        lineCount += str.length;
        beforeStr = str;
      } else {
        break;
      }
    }
    console.log(selected, pos, beforeStr);
    if (!selected) {
      const e = splited.findIndex(e => e === beforeStr);
      const appendstr = '#'.repeat(value) + ' 大标题';
      console.log(appendstr);
      splited[e + 1] = appendstr;
    } else {

    }
    this.value = splited.join('\n');
  }

  ngOnDestroy() {

  }
}
