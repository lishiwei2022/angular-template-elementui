import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotfondComponent} from "./views/notfond/notfond.component";
import {LayoutComponent} from "./comm-components/layout/layout.component";
import {DemoTableComponent} from "./views/demo-table/demo-table.component";
import {FormControlComponent} from "./views/demo-form/form-control/form-control.component";

const routes: Routes = [{
  path: '',
  redirectTo: "login",
  pathMatch: 'full'
}, {
  path: 'login',
  //懒加载特性模块
  loadChildren: () => import("./views/login/login.module").then((mod) => {
    return mod.loginModule;
  })
}, {
  path: 'sys',
  component: LayoutComponent,
  children: [{
    path: 'user',
    loadChildren: () => import("./views/sysmanager/user/user.module").then((mod) => {
      return mod.userModule
    })
  }, {
    path: 'role',
    loadChildren: () => import("./views/sysmanager/role/role.module").then((mod) => {
      return mod.RoleModule
    })
  }, {
    path: 'menu',
    loadChildren: () => import("./views/sysmanager/menu/menu.module").then((mod) => {
      return mod.MenuModule
    })
  }, {
    path: 'table',
    component: DemoTableComponent,
    // routeConfig.data
    data: {
      keepalive: true
    }
  }, {
    path: 'form',
    component: FormControlComponent,
    // routeConfig.data
    data: {
      keepalive: true
    }
  }]
}, {
  path: "404",
  component: NotfondComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
