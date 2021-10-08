import { ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { NgMarkedEditorOption } from '../types/editor';
import { EditorOptService } from './editor-opt.service';
import { EditorStateManageService } from './editor-state-manage.service';
import { NgMarkedEditorService } from './ng-marked-editor.service';
import { TextareaSelectionService } from './utils/textarea-selection.service';

@Component({
  selector: 'lib-ng-marked-editor',
  templateUrl: './ng-marked-editor.html',
  styles: [
  ],
  styleUrls: [
    './styles/ng-marked-editor.component.less'
  ],
  providers: [
    NgMarkedEditorService,
    EditorOptService,
    EditorStateManageService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgMarkedEditorComponent implements OnInit, OnDestroy {
  @Input()
  option: NgMarkedEditorOption = {
    saveOption: {
      autoSave: false,
    }
  };

  ngMarkedEditorRefValue?: ElementRef;
  @ViewChild('ngMarkedEditorTpl')
  set ngMarkedEditorRef(elm: ElementRef) {
    if (elm) {
      this.ngMarkedEditorRefValue = elm;
      this.editorOptService.setElm(elm);
    }
  }

  @ViewChild('textareaTpl')
  textareaRef?: ElementRef;

  value = '';

  editorState = {
    zoom: false,
    full: false,
    preview: true,
    code: false
  };

  domText = '';
  constructor(
    private ngMarkedEditorService: NgMarkedEditorService,
    private textareaSelectionService: TextareaSelectionService,
    private editorOptService: EditorOptService,
    private elm: ElementRef
  ) {
    this.editorState = this.editorOptService.state;
  }

  ngOnInit(): void {
    this.subscribeKeyboadeEvent();
  }

  // 点击工具条按钮时的响应方法
  toolbarClick($event: any): void {
    const { name, item , value } = $event;
    const { type , salis } = item;
    function dealFunction(e: string, index: number): string {
      if (index === 0) {
        return e;
      } else {
        return e.substring(0, 1).toUpperCase() + e.substring(1);
      }
    }

    if (type === 'editor-state') {    // 一般控制编辑器的展示
      const fnName = name.split('-').map(dealFunction).join('');
      if ((this.editorOptService as any)[fnName]) {
        const res = (this.editorOptService as any)[fnName]();
        this.editorState = res;
      }
    } else if (type === 'editor-opt') { // 控制浏览器的固有操作
      const fnName = name.split('-').map(dealFunction).join('');
      if ((this.editorOptService as any)[fnName]) {
        (this.editorOptService as any)[fnName]();
      }
    } else if (type === 'editor-transform') { // 对文本进行转换的
      const fnName = name.split('-').map(dealFunction).join('');
      if ((this.editorOptService as any)[fnName]) {
        this.value = (this.editorOptService as any)[fnName](this.value);
      }
    } else if (type === 'insert') { // 能够直接插入的
      const section = this.textareaSelectionService.getSelection(this.textareaRef?.nativeElement);
      if (this.editorOptService[name as 'bold']) {
        const res = this.editorOptService[name as 'bold' | 'title'](this.value, section  , value);
        this.value = res.value;
        setTimeout(() => {
          this.textareaSelectionService.textSelect(this.textareaRef?.nativeElement, res.selectStart, res.selectEnd);
        }, 1);
      } else if (this.editorOptService[salis as 'bold']) {
        const res = this.editorOptService[salis as 'bold'](this.value, section);
        this.value = res.value;
        setTimeout(() => {
          this.textareaSelectionService.textSelect(this.textareaRef?.nativeElement, res.selectStart, res.selectEnd);
        }, 1);
      }
    }
  }

  subscribeKeyboadeEvent(): void {
    let isPressed = false;
    let eventStatk = [];
    fromEvent(this.elm.nativeElement, 'keydown').subscribe((e: KeyboardEvent | any) => {
      isPressed = true;
      eventStatk.push(e);
    });
    fromEvent(this.elm.nativeElement, 'keyup').subscribe((e: KeyboardEvent | any) => {
      e.preventDefault();
      isPressed = false;
      eventStatk = [];
    });
  }

  previewValueChange(event: string): void {
    this.domText = event.replace(new RegExp('<span class="code-copy">复制代码</span>', 'g'), '');
  }

  ngOnDestroy(): void {
  }
}