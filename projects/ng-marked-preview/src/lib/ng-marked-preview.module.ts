import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import { MarkBaseService } from './../service/mark-base.service';
import { NgMarkedPreviewComponent } from './ng-marked-preview.component';

// export interface ExpandMarked {
//   newRender?: { [key: string]: (text: string, infostring: string) => string };
//   newTokenizer?: { [key: string]: (strs: string) => boolean | { type: string; raw: string; text: string; } };
// }

// export function provideExpand(routes: ExpandMarked): any {
//   const baseService: MarkBaseService = new MarkBaseService();
//   const { newRender, newTokenizer } = routes;
//   baseService.useRender(newRender);
//   baseService.useToken(newTokenizer);
//   return [
//     { provide: MarkBaseService, multi: false, useValue: baseService },
//   ];
// }
@NgModule({
  declarations: [
    NgMarkedPreviewComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgMarkedPreviewComponent,
  ]
})
export class NgMarkedPreviewModule {
  constructor() { }
}
