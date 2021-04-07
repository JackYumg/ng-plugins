import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DigitalComponent } from './digital/digital.component';

const routes: Routes = [
  { path: '', redirectTo: 'digital', pathMatch: 'full' },
  { path: 'digital', component: DigitalComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppearRoutingModule { }
