import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SimpleListComponent } from './simple-list/simple-list.component';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  declarations: [
    SimpleListComponent
  ],
  imports: [
  CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
