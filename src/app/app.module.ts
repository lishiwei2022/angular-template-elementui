import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NotfondComponent} from './views/notfond/notfond.component';
import {LayoutComponent} from './comm-components/layout/layout.component';
import {HttpClientModule} from "@angular/common/http";
import {SliderComponent} from "./comm-components/layout/slider/slider.component";
import {ContentToolbarComponent} from "./comm-components/layout/content-toolbar/content-toolbar.component";
import {ContentTabsComponent} from "./comm-components/layout/content-tabs/content-tabs.component";
import {ContentFooterComponent} from "./comm-components/layout/content-footer/content-footer.component";
import {ElModule} from 'element-angular'
import {httpInterceptorProviders} from "./util/http/httpInterceptorProviders";
import {DemoTableComponent} from './views/demo-table/demo-table.component';
import {FormControlComponent} from './views/demo-form/form-control/form-control.component';
import {SliderCloseComponent} from './comm-components/layout/slider-close/slider-close.component';
import {RouteReuseStrategy} from "@angular/router";
import {SimpleReuseStrategy} from "./util/route/SimpleReuseStrategy";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {AuthService} from "./service/auth.service";
import {SysService} from "./service/sys.service";

@NgModule({
  declarations: [
    AppComponent,
    NotfondComponent,
    LayoutComponent,
    SliderComponent,
    ContentToolbarComponent,
    ContentTabsComponent,
    ContentFooterComponent,
    DemoTableComponent,
    FormControlComponent,
    SliderCloseComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ElModule.forRoot()
  ],
  providers: [
    AuthService,
    SysService,
    httpInterceptorProviders,
    /**
     *  路由策略
     *  HashLocationStragegy（比如/#/concat,/#/about，后端只需要配置一个根路由即可，hash 能兼容低版本的浏览器，#后的服务端自动忽略）
     *  PathLocationStrategy(默认策略， 这种策略需要后台配置支持，因为我们的应用是单页面应用，如果后台没有正确的配置，当用户在浏览器从http:/10.0.0.1/concat跳转到http:/10.0.0.1/about或者刷新时就会返回404，需要在服务端里面覆盖所有的路由情况（后端可以通过nginx或者apache等配置）
     *
     */
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: RouteReuseStrategy, useClass: SimpleReuseStrategy},  //路由复用策略
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
