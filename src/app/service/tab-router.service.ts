import {Injectable} from "@angular/core";
import {OpenTab, TabRouter} from "../model/tab.mode";
import {NavigationEnd, Router} from "@angular/router";
import {tabRouterMapping} from "../staticdata/tab-routedatas";

@Injectable({
  providedIn: 'root'
})
export class TabRouterService {
  constructor(private router: Router) {
  }

  openTabRouterList: TabRouter[] = [];

  setOpenTabRouters(opentabRouters: TabRouter[]): void {
    this.openTabRouterList = opentabRouters.slice();
  }

  getOpenTabRouters(): TabRouter[] {
    return this.openTabRouterList;
  }

  /**
   * 根据路由信息，填充 tabRouterMapping
   * @param e
   * @constructor
   */
  EfillRouteData(e: NavigationEnd): TabRouter | undefined {
    let url = e.url;
    let nowModule = "";
    let queryParams = {} as any; //路由查询参数
    let params = {} as any; // 路由可选参数
    if (url.indexOf("?") > -1) {
      // 路由存在  查询参数
      nowModule = url.split("?")[0];
      const this_queryParams = url.split("?")[1];  //  a=1 或者  a=1&b=2&c=3
      const queryParmsList = this_queryParams.split("&");
      queryParmsList.forEach((k_v) => {
        const keyvalue = k_v.split("=");
        const key = keyvalue[0];
        const value = decodeURIComponent(keyvalue[1]); // 参数值如果是汉字会默认通过 encodeURIComponent
        if (!queryParams[key]) {
          queryParams[key] = value;
        }
      });
    }
    if (url.indexOf(";") > -1) {
      // 路由存在  可选参数
      nowModule = url.split(";")[0];
      const this_params = url.split(";");  // http://localhost:4200/detail;age=18;male=true
      this_params.forEach((k_v, index) => {
        if (index > 0) {
          const keyvalue = k_v.split("=");
          const key = keyvalue[0];
          const value = decodeURIComponent(keyvalue[1]); // 参数值如果是汉字会默认通过 encodeURIComponent
          if (!params[key]) {
            params[key] = value;
          }
        }
      })
    }
    if (url.indexOf("?") == -1 && url.indexOf(";") == -1) {
      // 没有参数
      nowModule = url;
    }

    let fillRouter = tabRouterMapping.find((tabRouter: TabRouter) => {
      const {module} = tabRouter;
      const moduleIndexOfnowModule = nowModule.indexOf(module);
      return moduleIndexOfnowModule > -1 && moduleIndexOfnowModule == nowModule.length - module.length;
    });
    if (fillRouter) {
      fillRouter.queryParams = queryParams;
      fillRouter.params = params;
      fillRouter.routepath = url.replace(/\//g, '_');
      fillRouter.tabrouterIndex = 0;
    }
    return fillRouter;
  }

  handSameModuleDiffTabs(openTabRouters: TabRouter[], newOpenTabRouter: TabRouter): TabRouter {
    const _newOpenTabRouter = {
      ...newOpenTabRouter
    } as any;
    let sameModuleList = openTabRouters.filter(tabRouter => tabRouter.module == newOpenTabRouter.module && tabRouter.routepath != newOpenTabRouter.routepath && tabRouter.tabrouterIndex == newOpenTabRouter.tabrouterIndex);
    while (sameModuleList.length > 0) {
      _newOpenTabRouter.tabrouterIndex = _newOpenTabRouter['tabrouterIndex'] + 1;
      _newOpenTabRouter.title = `${newOpenTabRouter.title}${_newOpenTabRouter.tabrouterIndex + 1}`;
      sameModuleList = openTabRouters.filter(tabRouter => tabRouter.title == _newOpenTabRouter.title && tabRouter.routepath != _newOpenTabRouter.routepath && tabRouter.tabrouterIndex == _newOpenTabRouter.tabrouterIndex);
    }
    return _newOpenTabRouter;
  }

  componentMethod: Function;

  injectComponentMethod(fun: Function): void {
    this.componentMethod = fun;
  }

  closeTab(redictpage: string): void {
    const openTabRouters = this.getOpenTabRouters();
    let nowpageRouter: TabRouter, index_: number = -1;
    openTabRouters.forEach((item, index) => {
      if (item.selected) {
        nowpageRouter = item;
        index_ = Number(index)
      }
    })
    let nowpageTab: OpenTab = {
      name: "",
      selected: true,
      type: "success",
      tabRouter: nowpageRouter
    };
    this.componentMethod(nowpageTab, index_);
    this.router.navigate([redictpage])
  }
}
