import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MenuComponent} from "./menu.component";
import {MenuAddComponent} from "./menu-add/menu-add.component";

const routes: Routes = [{
  path: '',
  component: MenuComponent,
  data: {
    keepalive: false   //列表缓存，目的是缓存列表的搜索表单内容，  不缓存表格数据所以每次进入列表页要额外处理去刷新列表
  }
}, {
  path: 'add',
  component: MenuAddComponent,
  data: {
    keepalive: true
  }
}, {
  path: 'edit',
  component: MenuAddComponent,
  data: {
    keepalive: true
  }
}]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MenuRoutingModule {

}
