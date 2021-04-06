import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgDigitalModule } from 'projects/ng-digital/src/public-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgDigitalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
