# AngularTemplateBootstrap

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.4

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you
change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also
use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a
package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out
the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## 该项目模板简要说明

框架: `angular14`.0.4 中文官网地址： https://angular.cn/
UI库:  element-ui   官网地址:https://element-angular.faas.ele.me/guide/install
       ----大坑之一： 对于angular懒加载的特性模块，需要重新引入ElModule才能用倒其提供的组件，但是会导致angular拦截器异常（特性模块中的请求拦截不到，需要为每个特性模块提供拦截器）
       ----大坑之二： 组件不好用，
                    NavMenu导航菜单，tooltip会报错;
                    breadcrumb面包屑项目用*ngFor循环会重复
                    table组件列属性slot不起作用[操作列无法处理]
                    pagination组件，page-size变化没有事件通知[无法监听]
                    按钮组件不能直接使用 *ngif指令[渲染生成的dom不会因为变量变为false而被销毁]
       ----不方便：  没弹框

页面加载/ajax/文档就绪状态使用pace: https://codebyzach.github.io/pace/docs/
后端框架：express  官网地址：https://www.expressjs.com.cn/
图标库： font-awesome 官网地址：http://www.fontawesome.com.cn/
图表库：echarts 
加密算法库：crypto-js 
登入用户名： admin
登入密码： 123

