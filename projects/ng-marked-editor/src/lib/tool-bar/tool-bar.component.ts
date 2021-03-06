import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewContainerRef } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { fromEvent, Subscription } from 'rxjs';
import { MdModalComponent } from '../md-modal/md-modal.component';
import { EditorStateManageService } from '../editor-state-manage.service';
import { ThemeType } from '../ng-marked-editor.component';
import { NgMarkedEditorService } from '../ng-marked-editor.service';
@Component({
  selector: 'lib-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.dark]': 'theme === "dark"',
    '[class.default]': 'theme === "default"'
  }
})
export class ToolBarComponent implements OnInit, OnDestroy {

  @Output()
  clickEvent: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  hasHistory = false; // 是否有上一步

  @Input()
  hasFurtrue = false; // 是否有下一步

  @Input()
  stateInstance?: EditorStateManageService;
  @Input()
  editorService?: NgMarkedEditorService;
  @Input()
  theme: ThemeType = 'default';

  baseGroup1 = [
    { name: '#icon-bold', title: '加粗', type: 'insert' },
    { name: '#icon-underline', title: '下划线', type: 'insert' },
    { name: '#icon-italic', title: '斜体', type: 'insert' },
    { name: '#icon-strike-through', title: '划去', type: 'insert', salis: 'through' },
  ];

  baseTitlt = { name: '#icon-title', show: false, type: 'insert', title: '标题' };

  baseGroup2 = [
    { name: '#icon-sub', title: '下标', type: 'insert' },
    { name: '#icon-sup', type: 'insert', title: '上标' },
    { name: '#icon-quote', type: 'insert', title: '引用' },
    { name: '#icon-unordered-list', type: 'insert', title: '无序列表', salis: 'ulList' },
    { name: '#icon-ordered-list', type: 'insert', title: '有序列表', salis: 'olList' },
  ];

  baseGroup3 = [
    { name: '#icon-code-row', title: '行内代码', type: 'insert', salis: 'codeRow' },
    { name: '#icon-code', title: '代码块', type: 'insert' },
    { name: '#icon-link', title: '链接', type: 'modal' },
    { name: '#icon-image', title: '图片', type: 'modal' },
    { name: '#icon-table', title: '表格', type: 'insert' },
  ];

  moreFunction = [
    { name: '#icon-liuchengtu', title: '流程图', show: false, type: 'insert' },
    { name: '#icon-gongshi', show: false, title: '公式', type: 'insert' }
  ];
  optGroup = [
    { name: '#icon-revoke', title: '撤销', disabledIcon: '#icon-invock-disable', disabled: false },
    { name: '#icon-next', title: '回滚', disabled: false, disabledIcon: '#icon-next-disable' },
    { name: '#icon-baocun', title: '保存', disabled: false },
  ];

  rightGroup = [
    { name: '#icon-prettier', type: 'editor-transform' },
    { name: '#icon-fangda', bakName: '#icon-suoxiao', type: 'editor-state' },
    { name: '#icon-fullScreen', bakName: '#icon-fullScreen-exit', type: 'editor-opt' },
    { name: '#icon-preview', bakName: '#icon-eye-close', type: 'editor-state' },
    { name: '#icon-coding', type: 'editor-state', title: '查看源代码', bakTitle: '预览效果' },
    { name: '#icon-github', title: '源码地址' },
  ];

  titleOpen = false;
  clickWindowEvent?: Subscription;
  globalEvent?: Subscription;
  resizeEvent?: Subscription;
  constructor(
    public viewContainerRef: ViewContainerRef,
    private cdk: ChangeDetectorRef,
    private overlay: Overlay,
  ) { }

  ngOnInit(): void {
    this.clickWindowEvent = fromEvent(window, 'click').subscribe(($event) => {
      if (($event.target as any).name !== 'tool') {
        this.baseTitlt.show = false;
        this.moreFunction[0].show = false;
        this.moreFunction[1].show = false;
        this.cdk.detectChanges();
      }
    });

    this.globalEvent = fromEvent(window, 'keyup').subscribe((e: KeyboardEvent | any) => {
      if (String.prototype.toLowerCase.call(e.code) === 'f11') {
        e.preventDefault();
        this.itemClick(this.rightGroup[2]);
      }
    });

    this.initInvockOrNextState();
    this.stateInstance?.toolEvent.subscribe(() => {
      this.initInvockOrNextState();
    });

    // 控制图标展示
    const option = this.editorService?.getOption();
    console.log(option);
  }

  // 每个图标被点击时
  itemClick(i: any, event?: Event, e?: any): void {
    event?.stopPropagation();
    const name = i.name.split(/^#[\w]+\-/)[1];
    if (i.bakName) {
      const temp = i.name;
      i.name = i.bakName;
      i.bakName = temp;
    }
    if (name === 'title' || name === 'liuchengtu' || name === 'gongshi') {
      [this.baseTitlt, ...this.moreFunction].map((item) => {
        if (item.name === i.name) {
          item.show = true;
        } else {
          item.show = false;
        }
      });
      if (e) {
        this.clickEvent.emit({ item: i, name, value: e });
      }
    } else if (name === 'github') {
      window.open('https://github.com/JackYumg/ng-plugins/tree/main/projects/ng-marked-editor', '__target');
    } else {
      this.clickEvent.emit({ item: i, name });
    }
    this.cdk.detectChanges();
  }

  // 创建弹框
  createModal(): void {
    const ref = this.overlay.create({
      hasBackdrop: true,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay.position().global(),
      disposeOnNavigation: true
    });
    const modal = new ComponentPortal(MdModalComponent);
    ref.attach(modal);
  }

  // 初始化时获取操作按钮状态
  initInvockOrNextState(): void {
    const hasPre = this.stateInstance?.hasPre();
    const hasNext = this.stateInstance?.hasNext();
    this.optGroup[0].disabled = !hasPre;
    this.optGroup[1].disabled = !hasNext;
    this.cdk.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.clickWindowEvent) {
      this.clickWindowEvent.unsubscribe();
    }
  }



}
