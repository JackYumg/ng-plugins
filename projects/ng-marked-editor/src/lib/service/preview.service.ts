import { Injectable } from '@angular/core';
import { MarkBaseService } from 'ng-marked-preview';

@Injectable({
  providedIn: 'root'
})
export class PreviewService {

  expandInfo = {};
  constructor(
    private markBase: MarkBaseService
  ) { }

  use(option: any): void {
    const { newRender, newTokenizer } = option;
    this.markBase.useRender(newRender);
    this.markBase.useToken(newTokenizer);
  }
}
