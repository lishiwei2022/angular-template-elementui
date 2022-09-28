import {RouterModule, Routes} from "@angular/router";
import {UserComponent} from "./user.component";
import {NgModule} from "@angular/core";
import {UserAddComponent} from "./user-add/user-add.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";

const routers: Routes = [{
  path: '',
  component: UserComponent,
  data: {
    keepalive: true
  }
}, {
  path: 'add',
  component: UserAddComponent,
  data: {
    keepalive: true
  }
}, {
  path: 'edit',
  component: UserAddComponent,
  data: {
    keepalive: true
  }
}, {
  path: "detail",
  component: UserDetailComponent,
  data: {
    keepalive: false
  }
}]

@NgModule({
  imports: [
    RouterModule.forChild(routers)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule {

}
