import { NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'plugins', loadChildren: () => import('./plugins/plugins.module').then((m) => m.PluginsModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private activeRouter: ActivatedRoute) {
    const menus = [];
    activeRouter.children.map((e) => {
      e.snapshot.url[0].path
    });
  }

  getMenus(routers: ActivatedRoute[]) {
    const temp = routers.map((e) => {
      const temp: any = {
        children: [],
        current: {}
      };
      if (e.children.length > 0) {
        const children = this.getMenus(e.children);
        temp.children = children;
      }
      const { path } = e.snapshot.url[0];
      temp.current.path = path;
      return temp;
    });
    return temp;
  }
}
