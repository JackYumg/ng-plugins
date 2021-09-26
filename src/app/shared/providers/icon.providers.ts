import { Provider } from '@angular/compiler/src/core';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import {

} from '@ant-design/icons-angular/icons';
const ICONS: IconDefinition[] = [
];
export const iconProviders: Provider = [
  {
    provide: NZ_ICONS,
    useValue: ICONS,
  },
];
