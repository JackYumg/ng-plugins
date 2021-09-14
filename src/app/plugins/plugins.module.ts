import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluginsRoutingModule } from './plugins-routing.module';
import { PluginsComponent } from './plugins/plugins.component';
import { SharedModule } from './../shared/shared.module';


@NgModule({
  declarations: [
    PluginsComponent
  ],
  imports: [
    CommonModule,
    PluginsRoutingModule,
    SharedModule
  ]
})
export class PluginsModule { }
