import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleListComponent } from './simple-list/simple-list.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'simple-list', pathMatch: 'full'
  },
  {
    path: 'simple-list', component: SimpleListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
