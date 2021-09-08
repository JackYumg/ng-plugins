import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { NgEditorMarkdownService } from '../ng-editor-markdown.service';
import { icons, IconsTypes, typeNameIcons } from './svg.data';

@Component({
  selector: 'md-editor-toolbar',
  templateUrl: './md-editor-toolbar.component.html',
  styleUrls: ['./md-editor-toolbar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdEditorToolbarComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  tools: typeNameIcons | undefined;
  toolIconsPath = './../../assets/svg/editor/';
  toolIcons: IconsTypes[] = [];
  headOpen = false;
  constructor(
    private ngEditorMarkdownService: NgEditorMarkdownService,
    private cdk: ChangeDetectorRef,
    private elm: ElementRef
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tools.currentValue) {
      this.createIcons();
    }
  }

  _listElmRef!: ElementRef;
  @ViewChild('listElmTpl', { static: true })
  set listElmRef(elm: ElementRef) {
    this._listElmRef = elm;
  };

  get listElmRef() {
    return this._listElmRef;
  };


  ngOnInit(): void {
    fromEvent(this.elm.nativeElement , 'mousedown').subscribe( ($event:any) => {
      $event.preventDefault();
    });
    fromEvent(window, 'click').subscribe(($event) => {
      if (($event.target as any).name !== 'tool') {
        this.headOpen = false;
        this.cdk.detectChanges();
      }
    });
  }

  createIcons() {
    const myIcons = icons.filter((icon: { valueEn: string; }) => {
      return this.tools?.some(e => icon.valueEn === e);
    });

    this.toolIcons = myIcons;
  }


  clickEvent(event: MouseEvent , type: any, value?: any) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    if (type === 'header') {
      this.headOpen = true;
      this.ngEditorMarkdownService.toolBarEvent.emit({
        type,
        value
      });
    } else {
      this.ngEditorMarkdownService.toolBarEvent.emit({
        type
      });
    }
  }
  ngOnDestroy() {

  }
}
