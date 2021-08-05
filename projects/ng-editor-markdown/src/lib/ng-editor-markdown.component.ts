import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EditorOptions } from 'ng-zorro-antd/code-editor';
import { fromEvent } from 'rxjs';
import { THEME_MODE } from '../core/datas';

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
export class NgEditorMarkdownComponent implements OnInit, ControlValueAccessor {

  // 选项,只用来初始化编辑器,期间有改变的都不能作为其中的配置
  @Input()
  option: EditorOptions = {};

  @Input()
  theme: THEME_MODE = THEME_MODE.DEFAULT;

  isWorking = false;
  constructor(
    private cdk: ChangeDetectorRef
  ) { }

  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }


  _editorFrammeRef: ElementRef | undefined;
  @ViewChild('editorFrammeTpl')
  set editorFrammeRef(elem: ElementRef) {
    this._editorFrammeRef = elem;
    if(elem) {
      fromEvent(this._editorFrammeRef.nativeElement , 'focus').subscribe( (res) => {
        console.log(res);
        this.isWorking = true;
      });
      fromEvent(this._editorFrammeRef.nativeElement , 'bulr').subscribe( (res) => {
        this.isWorking = false;
        console.log(res);
      });
    }
  }

}
