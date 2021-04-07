import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppearRoutingModule } from './appear-routing.module';
import { DigitalComponent } from './digital/digital.component';
import { NgDigitalModule } from 'projects/ng-digital/src/public-api';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DigitalComponent
  ],
  imports: [
    CommonModule,
    AppearRoutingModule,
    NgDigitalModule,
    SharedModule
  ]
})
export class AppearModule { }
