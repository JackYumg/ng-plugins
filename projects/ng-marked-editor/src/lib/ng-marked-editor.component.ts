import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component,
  ElementRef, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output, ViewChild
} from '@angular/core';
import { fromEvent, fromEventPattern } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NgMarkedEditorOption } from './types/editor';
import { EditorOptService } from './editor-opt.service';
import { EditorStateManageService } from './editor-state-manage.service';
import { EditorStorageService } from './editor-storage.service';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { LinkUploadComponent } from './link-upload/link-upload.component';
import { NgMarkedEditorService } from './ng-marked-editor.service';
import { TextareaSelectionService } from './utils/textarea-selection.service';
import { MainModalService } from './main-modal/main-modal.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

export let MarkedEditorAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => NgMarkedEditorComponent),
  multi: true
};

export type ThemeType = 'default' | 'dark';

@Component({
  selector: 'lib-ng-marked-editor',
  templateUrl: './ng-marked-editor.html',
  styles: [
  ],
  styleUrls: [
    './styles/ng-marked-editor.component.less'
  ],
  providers: [
    EditorOptService,
    EditorStateManageService,
    EditorStorageService,
    MainModalService,
    MarkedEditorAccessor
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgMarkedEditorComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input()
  option: NgMarkedEditorOption = {
    saveOption: {
      autoSave: false,
    },
  };

  // 点击保存时向外面抛出事件
  @Output()
  saveChange = new EventEmitter<string>();

  private appKey = '';
  // 服务实列传递给子组件使用
  editorStateManageInstance?: EditorStateManageService;
  ngMarkedEditorRefValue?: ElementRef;
  textareaRefValue?: ElementRef;

  rootValue = '';

  editorState = {
    zoom: false,
    full: false,
    preview: true,
    code: false
  };

  domText = '';

  // 表单属性
  disabled = false;

  // 主题
  @Input()
  theme: ThemeType = 'default';
  scrollH = 0;
  isjsScroll = false; // 判断非用户行为滚动
  jsScrollTime: any;
  tempTIme: any;
  @ViewChild('ngMarkedEditorTpl')
  set ngMarkedEditorRef(elm: ElementRef) {
    if (elm) {
      this.ngMarkedEditorRefValue = elm;
      this.editorOptService.setElm(elm);
    }
  }

  @ViewChild('textareaTpl')
  set textareaRef(e: ElementRef | undefined) {
    this.textareaRefValue = e;
    if (e) {
      this.subscribeKeyboadeEvent();
      this.initTextareaEvent();
    }
  }

  get textareaRef(): ElementRef | undefined {
    return this.textareaRefValue;
  }
  getAppkey(): string {
    return this.appKey;
  }

  public setAppKey(appkey: string): void {
    this.appKey = appkey;
  }

  get hasHistory(): boolean {
    return this.editorStateManageService.stateStacks.length > 0;
  }

  @Input()
  set value(value: string) {
    this.rootValue = value;
    this.editorStorageService.saveEvent.emit(value);
  }

  get value(): string {
    return this.rootValue;
  }


  constructor(
    private ngMarkedEditorService: NgMarkedEditorService,
    private textareaSelectionService: TextareaSelectionService,
    private editorOptService: EditorOptService,
    private cdk: ChangeDetectorRef,
    private editorStateManageService: EditorStateManageService,
    private mainModalService: MainModalService,
    private editorStorageService: EditorStorageService
  ) {
    this.editorState = this.editorOptService.state;
    this.editorStateManageInstance = editorStateManageService;
  }

  ngOnInit(): void {
    this.subscribeModalEvent();
    this.createAppKey();
    this.autoSaveConfig();
  }
  // 点击工具条按钮时的响应方法
  toolbarClick($event: any): void {
    const { name, item, value } = $event;
    const { type, salis } = item;
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
        this.editorStateManageService.pushState({
          value: this.value
        });
      }
    } else if (type === 'insert') { // 能够直接插入的
      const section = this.textareaSelectionService.getSelection(this.textareaRef?.nativeElement);
      if (this.editorOptService[name as 'bold']) {
        const res = this.editorOptService[name as 'bold' | 'title'](this.value, section, value);
        this.value = res.value;
        this.editorStateManageService.pushState({
          value: this.value
        });
        this.editorStateManageService.toolEvent.emit(true);
        setTimeout(() => {
          this.textareaSelectionService.textSelect(this.textareaRef?.nativeElement, res.selectStart, res.selectEnd);
        }, 1);
      } else if (this.editorOptService[salis as 'bold']) {
        const res = this.editorOptService[salis as 'bold'](this.value, section);
        this.value = res.value;
        this.editorStateManageService.pushState({
          value: this.value
        });
        this.editorStateManageService.toolEvent.emit(true);
        setTimeout(() => {
          this.textareaSelectionService.textSelect(this.textareaRef?.nativeElement, res.selectStart, res.selectEnd);
        }, 1);
      }
    } else if (type === 'modal') {// 如果是弹出框
      if (name === 'image') {
        const ref = this.mainModalService.create({
          content: ImageUploadComponent,
          modalParams: {
            title: '10086',
            theme: this.theme
          }
        });
      } else if (name === 'link') {
        this.mainModalService.create({
          content: LinkUploadComponent,
          modalParams: {
            theme: this.theme
          }
        });
      }
    } else if (name === 'baocun') {
      this.editorStorageService.saveImidet(this.value);
      this.saveChange.emit(this.value);
    } else if (name === 'revoke') {
      const state = this.editorStateManageService.rollback();
      if (state) {
        this.value = state.value || '';
      }
      this.editorStateManageService.toolEvent.emit(true);
    } else if (name === 'next') {
      const state = this.editorStateManageService.rollInvoke();
      if (state) {
        this.value = state.value || '';
      }
      this.editorStateManageService.toolEvent.emit(true);
    }
  }


  // 订阅键盘的事件
  subscribeKeyboadeEvent(): void {
    let keyStack: any[] = [];
    const keyBoardKeys = [
      'KeyY',
      'KeyZ',
      'KeyS'
    ];
    let isPressed = false;
    fromEvent(this.textareaRef?.nativeElement, 'keyup').subscribe((e: any) => {
      if (e.code === 'ControlLeft') {
        keyStack = [];
        isPressed = false;
      }
    });


    const key1Event = fromEvent(this.textareaRef?.nativeElement, 'keydown').pipe(filter((e: any) => {
      const isCtrl = e.code === 'ControlLeft';
      if (isCtrl) {
        keyStack = [];
        keyStack.push(e);
        isPressed = true;
        return false;
      }

      const finded = keyBoardKeys.findIndex(key => key === e.code) >= 0;
      if (finded && isPressed) {
        if (keyStack.length >= 1) {
          keyStack[1] = e;
          e.returnValue = false;
          return true;
        } else {
          keyStack.push(e);
          e.returnValue = true;
          return true;
        }
      }
      return true;
    }));
    key1Event.subscribe((e) => {
      if (e.code === 'KeyZ' && isPressed) {
        const state = this.editorStateManageService.rollback();
        if (state) {
          this.value = state.value || '';
        }
      } else if (e.code === 'KeyS' && isPressed) {
        e.returnValue = false;
        this.editorStorageService.saveImidet(this.value);
      } else if (e.code === 'KeyY' && isPressed) {
        const state = this.editorStateManageService.rollInvoke();
        if (state) {
          this.value = state.value || '';
        }
      } else if (e.code === 'KeyV' && isPressed) {
        if (this.tempTIme) {
          clearTimeout(this.tempTIme);
        }
        this.tempTIme = setTimeout(() => {
          const state: any = this.editorStateManageService.pushState({
            value: this.value
          });
          this.editorStateManageService.toolEvent.emit(true);
          if (state) {
            this.value = state.value || '';
          }
        }, 0);
      } else {
        this.editorStateManageService.pushState({
          value: this.value
        });
        if (this.editorStateManageService.isInputText(e.keycode)) {
          this.editorStateManageService.clearY();
        }
      }
      this.editorStateManageService.toolEvent.emit(true);
      this.cdk.detectChanges();
    });

  }

  // 订阅文本输入事件
  textValueChange($event: any): void {
    this.editorStateManageService.pushState({
      value: $event
    });
  }

  // 订阅模态框的事件
  subscribeModalEvent(): void {
    this.ngMarkedEditorService.fileUploadEvent.subscribe((result) => {
      const { type } = result;
      if (type === 'image' || type === 'link') {
        const section = this.textareaSelectionService.getSelection(this.textareaRef?.nativeElement);
        const res = this.editorOptService[type as 'image'](this.value, section, result);
        this.value = res.value;
        this.textareaSelectionService.textSelect(this.textareaRef?.nativeElement, res.selectStart, res.selectEnd);
        this.cdk.detectChanges();
        this.mainModalService.closeAll();
      } else if (type === 'cancel') {
        this.mainModalService.closeAll();
      }
    });
  }

  // 判断是否启动存储功能
  autoSaveConfig(): void {
    if (this.option.saveOption.autoSave) {
      this.editorStorageService.loadConfig(this.appKey).then((res) => {
        if (res) {
          this.editorStorageService.start();
        }
      });
    }
  }

  previewValueChange(event: string): void {
    this.domText = event.replace(new RegExp('<span class="code-copy">复制代码</span>', 'g'), '');
  }

  // 创建APPID
  createAppKey(): void {
    const key = Date.now() * Math.random() * 10000;
    this.setAppKey(key.toString());
  }

  // 预览框滚动事件
  scrollEvent($event: any): void {
    this.isjsScroll = true;
    const { target } = $event;
    const t1 = target.scrollHeight - target.clientHeight;
    const h: any = target.scrollTop / t1 * (this.textareaRef?.nativeElement.scrollHeight - this.textareaRef?.nativeElement.clientHeight);
    (this.textareaRef?.nativeElement as any).scrollTop = h;
    if (this.jsScrollTime) {
      clearTimeout(this.jsScrollTime);
    }
    this.jsScrollTime = setTimeout(() => {
      this.isjsScroll = false;
    }, 100);
  }

  // 监听文本框的滚动事件
  initTextareaEvent(): void {
    let subs: Subscription;
    const addScrollEvent = (e: any) => {
      subs = fromEvent(this.textareaRef?.nativeElement, 'scroll').pipe(filter(() => !this.isjsScroll)).subscribe((event: any) => {
        const { target } = event;
        const t1 = target.scrollHeight - target.clientHeight;
        const h: any = target.scrollTop / t1;
        this.scrollH = h;
        this.cdk.detectChanges();
      });
    };

    const removeScrollEvent = () => {
      subs.unsubscribe();
    };

    fromEventPattern(addScrollEvent, removeScrollEvent).subscribe((e) => {
      console.log(e);
    });

  }

  ngOnDestroy(): void {
    this.editorStorageService.destory();
  }

  writeValue(obj: any): void {
    this.value = obj;
    const state: any = this.editorStateManageService.pushState({
      value: this.value
    });
    this.editorStateManageService.toolEvent.emit(true);
    this.cdk.detectChanges();
  }
  registerOnChange(fn: any): void {
    this.propsChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propsTouched = fn;
  }

  propsChange = (_: any) => { };
  propsTouched = (_: any) => { };
  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
    this.cdk.detectChanges();
  }

}
