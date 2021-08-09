import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, Subscription } from 'rxjs';
import { THEME_MODE } from '../core/datas';
import { NgEditorMarkdownService } from './ng-editor-markdown.service';
import { throttleTime } from 'rxjs/operators';

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
    private ngEditorMarkdownService: NgEditorMarkdownService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
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

      this.eventBus.keydown = fromEvent<Event>(this._editorFrammeRef.nativeElement, 'keydown').pipe(throttleTime(1000)).subscribe((keyEvent: Event) => {
        const { innerHTML } = keyEvent.target as HTMLElement;
        this.writeValue(innerHTML);
      });
    }
  }

  subscribeToolEvent() {
    this.ngEditorMarkdownService.toolBarEvent.subscribe(({ type }) => {
      switch (type) {
        case 'bold':// 点击了加粗

          break;

        default:
          break;
      }
    });
  }

  addBold() {
    var txt = window.getSelection ? window.getSelection() : (document as any).selection.createRange().text;
    if (txt) {
      
    }
  }

}
