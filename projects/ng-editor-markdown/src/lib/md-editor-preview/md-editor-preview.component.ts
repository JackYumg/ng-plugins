import { Directive, Input, OnChanges, OnInit, SimpleChange, ElementRef } from '@angular/core';
import { WordSplit } from '../../util/split';
import { TokenTree } from './../../util/tree';
import { NgEditorMarkdownService } from './../ng-editor-markdown.service';

type PreviewChanges = {
  content: SimpleChange
}
@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[md-editor-preview]',
  providers: [
    TokenTree,
    NgEditorMarkdownService
  ],
})
export class MdEditorPreviewComponent implements OnInit, OnChanges {

  @Input()
  content: string | undefined = '';

  ngOnChanges(simpleChange: PreviewChanges): void {
    if (simpleChange.content.currentValue || !simpleChange.content.firstChange) {
      this.compaire();
    }
  }
  constructor(
    private wordSplit: WordSplit,
    private tokenTree: TokenTree,
    private element: ElementRef,
    private ngEditorMarkdownService: NgEditorMarkdownService
  ) { }

  ngOnInit(): void {

  }

  compaire(): void {
    (this.element.nativeElement as HTMLElement).innerHTML = '';
    const tracks: string[] = this.wordSplit.parse(this.content);
    this.ngEditorMarkdownService.lineNumEvent.emit(this.content?.split('\n'));
    const nodes = this.wordSplit.createVnodes(tracks);
    const domtrees = this.tokenTree.createDomTree(nodes);
    domtrees.forEach((e) => {
      this.element.nativeElement.append(e);
    });
  }
}
