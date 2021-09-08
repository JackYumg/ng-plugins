import { Directive, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, Renderer2, ElementRef } from '@angular/core';
import { MarkDownRender } from '../../util/render';
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
    TokenTree
  ],
})
export class MdEditorPreviewComponent implements OnInit, OnChanges {

  @Input()
  content: string | undefined = '';

  ngOnChanges(simpleChange: PreviewChanges) {
    if (simpleChange.content.currentValue || !simpleChange.content.firstChange) {
      this.compaire();
    }
  }
  constructor(
    private markDownRender: MarkDownRender,
    private wordSplit: WordSplit,
    private tokenTree: TokenTree,
    private render2: Renderer2,
    private element: ElementRef,
    private ngEditorMarkdownService: NgEditorMarkdownService
  ) { }

  ngOnInit(): void {

  }

  compaire() {
    (this.element.nativeElement as HTMLElement).innerHTML = '';
    const tracks: string[] = this.wordSplit.parse(this.content);
    console.log(tracks);
    this.ngEditorMarkdownService.lineNumEvent.emit(this.content?.split('\n').length);
    const nodes = this.wordSplit.createVnodes(tracks);
    const domtrees = this.tokenTree.createDomTree(nodes);
    domtrees.forEach((e) => {
      this.element.nativeElement.append(e);
    });
  }
}
