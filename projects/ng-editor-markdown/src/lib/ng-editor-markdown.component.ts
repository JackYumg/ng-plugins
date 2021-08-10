import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, NgZone, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, Subscription } from 'rxjs';
import { THEME_MODE } from '../core/datas';
import { NgEditorMarkdownService } from './ng-editor-markdown.service';
import { throttleTime } from 'rxjs/operators';
import { boldExp, charExp, italtcExp } from '../core/datas/rgeexp';
import { DEFAULT_STR } from '../core/datas/static.daa';
import { MarkdownHelper } from '../util/helper';

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
export class NgEditorMarkdownComponent implements OnInit, OnChanges, ControlValueAccessor {

  // 选项,只用来初始化编辑器,期间有改变的都不能作为其中的配置
  @Input()
  option = {};

  @Input()
  theme: THEME_MODE = THEME_MODE.DEFAULT;

  isWorking = false;

  _value: string | undefined;
  set value(value: string | undefined) {
    this._value = value;
  }

  get value(): string | undefined {
    return this._value;
  }

  constructor(
    private cdk: ChangeDetectorRef,
    private ngEditorMarkdownService: NgEditorMarkdownService,
    private render: Renderer2,
    private markdownHelper: MarkdownHelper,
    private ngZone: NgZone
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

  ngOnInit(): void {
  }


  eventBus: { [key: string]: Subscription | null } = {
    focus: null,
    bulr: null,
    keydown: null,
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
      this.subscribeToolEvent();
    }
  }

  subscribeToolEvent() {
    this.ngEditorMarkdownService.toolBarEvent.subscribe(({ type }) => {
      switch (type) {
        case 'bold':// 点击了加粗
          this.addBold();
          break;
        case 'header':
          break;
        case 'italtc':
          this.addItaltc();
          break;
        default:
          break;
      }
    });
  }

  addBold() {
    const text = this.markdownHelper.getSelected(this._editorFrammeRef?.nativeElement);
    const pis = this.markdownHelper.getTextAreaPos((this._editorFrammeRef?.nativeElement as HTMLTextAreaElement)) || 0;
    if (!text) { // 没有选中的
      const boldStr = this.value?.slice(0, pis) + DEFAULT_STR.BOLD + this.value?.slice(pis, this.value.length);
      this.writeValue(boldStr);
      this.ngZone.run(() => {
        setTimeout(() => {
          this.markdownHelper.textSelect(this._editorFrammeRef?.nativeElement, pis + 2, pis + DEFAULT_STR.BOLD.length - 2);
        }, 10);
      });
    } else if (text === DEFAULT_STR.NOQUTE_BOLD) {
      if (pis >= 2) {
        const fullStr = this.value?.slice(pis - 2, pis + DEFAULT_STR.NOQUTE_BOLD.length + 2) || '';
        if (boldExp.test(fullStr)) {
          const boldStr = this.value?.slice(0, pis - 2) + DEFAULT_STR.NOQUTE_BOLD + this.value?.slice(pis + DEFAULT_STR.NOQUTE_BOLD.length + 2, this.value.length);
          this.writeValue(boldStr);
          this.ngZone.run(() => {
            setTimeout(() => {
              this.markdownHelper.textSelect(this._editorFrammeRef?.nativeElement, pis - 2, pis + DEFAULT_STR.NOQUTE_BOLD.length - 2);
            }, 10);
          });
        } else {
          const boldStr = this.value?.slice(0, pis) + DEFAULT_STR.BOLD + this.value?.slice(pis + text.length, this.value.length);
          this.writeValue(boldStr);
          this.ngZone.run(() => {
            setTimeout(() => {
              this.markdownHelper.textSelect(this._editorFrammeRef?.nativeElement, pis + 2, pis + 2 + DEFAULT_STR.NOQUTE_BOLD.length);
            }, 10);
          });
        }
      } else {

      }
    }
  }

  addItaltc() {

  }


  addHeader() {

  }

}
