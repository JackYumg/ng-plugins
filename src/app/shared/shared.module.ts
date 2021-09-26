import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { iconProviders } from './providers/icon.providers';

const antModules = [
  NzLayoutModule,
  NzMenuModule,
  NzCardModule,
  NzAvatarModule,
  NzIconModule,
  NzGridModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule,
    ...antModules
  ],
  exports: [
    ComponentsModule,
    ...antModules
  ],
  providers: [
    iconProviders
  ]
})
export class SharedModule { }
