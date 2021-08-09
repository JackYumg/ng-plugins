import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { NgEditorMarkdownService } from '../ng-editor-markdown.service';
import { icons, IconsTypes, typeNameIcons } from './svg.data';

@Component({
  selector: 'md-editor-toolbar',
  templateUrl: './md-editor-toolbar.component.html',
  styleUrls: ['./md-editor-toolbar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdEditorToolbarComponent implements OnInit, OnChanges {

  @Input()
  tools: typeNameIcons | undefined;
  toolIconsPath = './../../assets/svg/editor/';
  toolIcons: IconsTypes[] = [];
  constructor(
    private render: Renderer2,
    private ngEditorMarkdownService: NgEditorMarkdownService
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
  }

  createIcons() {
    const myIcons = icons.filter((icon: { valueEn: string; }) => {
      return this.tools?.some(e => icon.valueEn === e);
    });

    this.toolIcons = myIcons;

  }


  clickEvent(type: any) {
    this.ngEditorMarkdownService.toolBarEvent.emit({
      type
    });
  }
}
