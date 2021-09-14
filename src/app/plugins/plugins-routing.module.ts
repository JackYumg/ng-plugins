import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluginsComponent } from './plugins/plugins.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  {
    path: 'index', component: PluginsComponent, children: [
      { path: 'appear', loadChildren: () => import('./appear/appear.module').then(m => m.AppearModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PluginsRoutingModule { }
