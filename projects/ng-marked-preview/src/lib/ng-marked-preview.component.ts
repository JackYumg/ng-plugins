import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit,
  Output,
  Renderer2, SimpleChanges
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { fromEvent, Subscription } from 'rxjs';
import { MarkBaseService } from '../service/mark-base.service';
import { NgMarkedPreviewService } from './ng-marked-preview.service';

type ThemeType = 'default' | 'dark';
@Component({
  selector: 'lib-ng-marked-preview',
  template: `
    <div class="ng-editor-md-workspace-display" [hidden]="!previewText" [class.default]="theme === 'default' || !theme" [class.dark]="theme === 'dark' || !theme" #rootElm [innerHtml]="previewText"></div>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    NgMarkedPreviewService
  ]
})
export class NgMarkedPreviewComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  context = '';

  @Output()
  scrollEvent: EventEmitter<Event> = new EventEmitter<Event>();

  @Output()
  valueChange: EventEmitter<string> = new EventEmitter<string>();

  previewText?: SafeHtml;
  // 订阅的点击事件
  clickEvent?: Subscription;

  @Input()
  theme: ThemeType = 'default';
  @Input()
  scrollH = 0;
  isjsScroll = false; // 判断非用户行为滚动
  jsScrollTime: any;
  constructor(
    private cdk: ChangeDetectorRef,
    private markBaseService: MarkBaseService,
    private elm: ElementRef,
    private render: Renderer2,
    private sanitizer: DomSanitizer
  ) {

  }

  ngOnInit(): void {
    this.subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const e = this.markBaseService.toHtml(this.context || '');
    this.previewText = this.sanitizer.bypassSecurityTrustHtml(e);
    this.valueChange.emit(e);
    if (changes.scrollH && changes.scrollH.currentValue) {
      this.scrollTo(this.scrollH);
      this.isjsScroll = true;
      if (this.jsScrollTime) {
        clearTimeout(this.jsScrollTime);
      }
      this.jsScrollTime = setTimeout(() => {
        this.isjsScroll = false;
      }, 100);
    } else {
      this.scrollH = 0;
    }
  }

  // 预览框可以滚动
  scrollTo(h: any): void {
    const target = this.elm.nativeElement;
    const t1 = target.scrollHeight - target.clientHeight;
    this.elm.nativeElement.scrollTop = h * t1;
    this.cdk.detectChanges();
  }

  // 订阅事件
  subscribe(): void {
    this.clickEvent = fromEvent(this.elm.nativeElement, 'click').subscribe((event: any) => {
      if (event.target.classList.contains('code-copy')) {
        const cdoedd = event.target.parentNode.children[0];
        const input = this.render.createElement('textarea');
        document.body.appendChild(input);
        input.value = cdoedd.innerText;
        input.select();
        if (document.execCommand) {
          const e = document.execCommand('copy');
          event.target.innerText = '复制成功';
          let timers: any = 0;
          if (timers) {
            clearTimeout(timers);
          }
          timers = setTimeout(() => {
            event.target.innerText = `复制代码`;
          }, 3000);
        }
        document.body.removeChild(input);
      }
    });

    fromEvent(this.elm.nativeElement, 'scroll').subscribe((event: Event | any) => {
      if (!this.isjsScroll) {
        this.scrollEvent.emit(event);
      }
    });

  }

  ngOnDestroy(): void {
    if (this.clickEvent) {
      this.clickEvent.unsubscribe();
    }
  }
}
