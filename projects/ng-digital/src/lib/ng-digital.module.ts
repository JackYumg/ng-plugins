import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgDigitalService } from './ng-digital.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgDigitalPanelComponent } from './ng-digital-panel/ng-digital-panel.component';
import { NgDigitalComponent } from './ng-digital/ng-digital.component';


@NgModule({
  declarations: [
    NgDigitalComponent,
    NgDigitalPanelComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  exports: [
    NgDigitalComponent,
    NgDigitalPanelComponent
  ],
  providers: [
    NgDigitalService
  ]
})
export class NgDigitalModule { }
