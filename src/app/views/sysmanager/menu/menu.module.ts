import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MenuRoutingModule} from "./menu.routing.module";
import {MenuComponent} from "./menu.component";
import {ElModule} from 'element-angular';
import {MenuAddComponent} from './menu-add/menu-add.component'
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    MenuComponent,
    MenuAddComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ElModule
  ]
})
export class MenuModule {

}
