import { Directive, Input, OnChanges, OnInit } from '@angular/core';
import { MarkDownRender } from '../../util/render';
import { WordSplit } from '../../util/split';

@Directive({
  selector: '[md-editor-preview]'
})
export class MdEditorPreviewComponent implements OnInit, OnChanges {

  @Input()
  content: string | undefined = '';

  ngOnChanges() {
    this.compaire();
  }
  constructor(
    private markDownRender: MarkDownRender,
    private wordSplit: WordSplit,
  ) { }

  ngOnInit(): void {

  }

  compaire() {
    const tracks: string[] = this.wordSplit.parse(this.content);
    const nodes = this.wordSplit.createVnodes(tracks);
  }
}
