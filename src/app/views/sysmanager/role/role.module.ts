import {NgModule} from "@angular/core";
import {RoleRoutingModule} from "./role.routing.module";
import {RoleComponent} from "./role.component";
import {ElModule} from "element-angular";
import {CommonModule} from "@angular/common";
import {RoleAddComponent} from "./role-add/role-add.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    RoleComponent,
    RoleAddComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RoleRoutingModule,
    ElModule
  ]
})
export class RoleModule {

}
