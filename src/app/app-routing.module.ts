import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'plugins', pathMatch: 'full' },
  { path: 'plugins', loadChildren: () => import('./plugins/plugins.module').then((m) => m.PluginsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
