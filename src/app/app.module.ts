import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// 引入你需要的图标，比如你需要 fill 主题的 AccountBook Alert 和 outline 主题的 Alert，推荐 ✔️
import { AccountBookFill, AlertFill, AlertOutline, UserOutline, GithubOutline, ApiOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { HttpClientModule } from '@angular/common/http';
const icons: IconDefinition[] = [AccountBookFill, AlertOutline, AlertFill, UserOutline, GithubOutline, ApiOutline];

const ANT_MODULES = [
  NzLayoutModule,
  NzMenuModule,
  NzTabsModule,
];

const SHARED_ANT_MODULES = [
  NzTypographyModule
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    ...ANT_MODULES,
    ...SHARED_ANT_MODULES,
    NzIconModule.forRoot(icons),
    HttpClientModule
  ],
  exports: [
    ...SHARED_ANT_MODULES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
