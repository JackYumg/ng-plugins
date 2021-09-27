import { ModuleWithProviders } from '@angular/compiler/src/core';
import { ANALYZE_FOR_ENTRY_COMPONENTS, Inject, InjectionToken, NgModule, Optional, SkipSelf } from '@angular/core';
import { NgMarkedPreviewComponent } from './ng-marked-preview.component';
import { NgMarkedPreviewService } from './ng-marked-preview.service';
export const MARKED_FORROOT_OPTION = new InjectionToken<void>('ROUTER_FORROOT_GUARD');

interface Options {
  name?: string;
}

const MARKEDOPTION = new InjectionToken<Options>('MARKEDOPTION');
function provideMarkedOption(option: Options): any {
  return [
    { provide: ANALYZE_FOR_ENTRY_COMPONENTS, multi: true, useValue: option },
    { provide: MARKEDOPTION, multi: true, useValue: option }
  ];
}


@NgModule({
  declarations: [
    NgMarkedPreviewComponent
  ],
  imports: [
  ],
  exports: [
    NgMarkedPreviewComponent
  ]
})
export class NgMarkedPreviewModule {
  constructor(
  ) {

  }
}
