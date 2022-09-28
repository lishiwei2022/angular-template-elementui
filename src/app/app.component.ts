import {Component} from '@angular/core';
import {Router, NavigationEnd, NavigationStart} from "@angular/router";
import {UtilService} from "./service/util.service";
import {sessionStorageService} from "./service/sessionStorage.service";
import {BreadCrumbService} from "./service/bread-crumb.service";
import {TabRouterService} from "./service/tab-router.service";
import {TabRouter} from "./model/tab.mode";
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-template-bootstrap';

  constructor(private router: Router,
              private util: UtilService,
              private sessionService: sessionStorageService,
              private breadcrumbService: BreadCrumbService,
              private tabRouterService: TabRouterService,
              private titleService: Title) {
    const detectZoom = () => {
      let ratio = 0;
      let screen = window.screen as any;
      let ua = navigator.userAgent.toLowerCase();
      if (window.devicePixelRatio != undefined) {
        ratio = window.devicePixelRatio;
      } else if (~ua.indexOf('msie')) {
        if (screen.deviceXDPI && screen.logicalXDPI) {
          ratio = screen.deviceXDPI / screen.logicalXDPI
        }
      } else if (window.outerWidth != undefined && window.innerWidth != undefined) {
        ratio = window.outerWidth / window.innerWidth
      }
      if (ratio) {
        ratio = Math.round(ratio * 100)
      }
      return ratio
    }
    //笔记本 系统默认系统比例为150%带来的布局影响。
    const m = detectZoom();
    (document.body.style as any).zoom = 100 / Number(m) + '';
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        const url = e.url;
        //路由开始变化
        if (url.indexOf('login') == -1) {
          const token = this.util.getToken();
          const localToken = this.sessionService.getItem("token") as string;
          const localSingKey = this.sessionService.getItem("sinkey") as string;
          if (!token) {
            //刷新页面
            if (localToken) {
              this.util.setToken(localToken);
              this.util.setSinkey(localSingKey)
            } else {
              // 未登入
              this.router.navigate(['/login'])
            }
          }
        }
      }
      if (e instanceof NavigationEnd) {
        //event是 NavigationEnd的一个实例
        //----内容区域，滚动归位
        const contentMain = document.getElementsByClassName('content-main')?.item(0);
        if (contentMain) {
          contentMain.scrollTop = 0
        }
        //面包屑处理
        this.breadcrumbService.setBreadCrumbs(e.url); //设置服务中最新的面包屑数据
        //服务中的数据不是响应式的，需要通过事件通知，告知 content-boolbar重新从服务中获取新数据
        this.util.emitterChange({
          type: 'update_breadcrumb',
          data: {}
        });

        //tab数据处理
        e.url = decodeURIComponent(e.url);  //路由参数带 /的， 被多次encodeURIComponent 转移，导致相同的url，通过routePath判断是不同的
        let openTabRouters = this.sessionService.getObj("openTabRouters") as TabRouter[];
        openTabRouters = openTabRouters?openTabRouters:[];
        let newopenTabRouter: TabRouter | undefined = this.tabRouterService.EfillRouteData(e);  //e 转换为  TabRouter
        //和 openTabRouters 对比， 处理相同 module(相同业务页面)，不同参数多个tab页
        if (newopenTabRouter != undefined) {
          newopenTabRouter = this.tabRouterService.handSameModuleDiffTabs(openTabRouters, newopenTabRouter);
          this.titleService.setTitle(newopenTabRouter.title);
          let exitTabRouter = openTabRouters.find(openTabRouter => openTabRouter.routepath == newopenTabRouter?.routepath);
          if (!exitTabRouter) {//如果存在不添加，当前表示选中
            openTabRouters.push(newopenTabRouter);
          }
          // openTabRouters（打开的tab页太多的限制）
          if (openTabRouters.length > 12) {
            openTabRouters = openTabRouters.slice(openTabRouters.length - 12);
          }
          // 选中状态
          openTabRouters.forEach(openTabRouter => openTabRouter.selected = newopenTabRouter?.routepath == openTabRouter.routepath);
          this.sessionService.setObj('openTabRouters', openTabRouters);
          this.tabRouterService.setOpenTabRouters(openTabRouters); //设置服务中tab的数据
          //服务中的数据不是响应式的，需要通过事件通知，告知 content-tabs重新从服务中获取新数据
          this.util.emitterChange({
            type: 'update_tabs',
            data: {}
          });
        }
      }
    });
  }
}
