import {NgModule} from "@angular/core";
import {UserRoutingModule} from "./user-routing.module";
import {UserComponent} from "./user.component";
import {UserAddComponent} from "./user-add/user-add.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {ElModule} from "element-angular";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
@NgModule({
  declarations:[
    UserComponent,
    UserAddComponent,
    UserDetailComponent
  ],
  imports:[
    UserRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    ElModule
  ]
})
export  class  userModule{

}
