import { InjectionToken, NgModule } from '@angular/core';
import { NgMarkedPreviewComponent } from './ng-marked-preview.component';
export const MARKED_FORROOT_OPTION = new InjectionToken<void>('ROUTER_FORROOT_GUARD');

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
