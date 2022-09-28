import {NgModule} from "@angular/core";
import {LoginComponent} from "./login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {LoginRoutingModule} from "./login-routing.module";
import {ElModule} from "element-angular";
import {AuthService} from "../../service/auth.service";
import {httpInterceptorProviders} from "../../util/http/httpInterceptorProviders";


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    ElModule
  ],
  // 模块内用到的非全局服务，需要提供服务注册商
  providers: [
    AuthService,
    httpInterceptorProviders
  ]
})
export class loginModule {
}
