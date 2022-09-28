//############ 确定是否应分离此路由（及其子树）以便以后复用，返回true时执行store方法，存储当前路由快照，返回false,直接跳过
/**
 * 是否应分离此路由（及其子树）以便以后复用，  路由离开执行
 * true ---执行store方法，存储当前路由快照
 * false---跳过什么都不处理
 */
//abstract  shouldDetach(route:ActivatedRouteSnapshot):boolean

/**
 * 存储分离的路由
 *存放在  cacheRouters：{ [key: string]: DetachedRouteHandle }
 */
//abstract  store(route:  ActivatedRouteSnapshot, handle:  DetachedRouteHandle):  void


/**
 * 确定是否应重新连接此路由（及其子树）
 * true--执行 retrieve方法，从快照中取到复用路由
 * false --路由重载
 */
//abstract  shouldAttach(route:  ActivatedRouteSnapshot): boolean


/**
 * 从路由快照 cacheRouters 中获取复用路由
 */
//abstract  retrieve(route:  ActivatedRouteSnapshot):  DetachedRouteHandle  |  null


/**
 * 确定是否 应复用路由， 进入路由执行
 * true---应复用，执行执行  shouldAttach
 * false---不应复用，执行  shouldDetach
 */
//abstract  shouldReuseRoute(future:  ActivatedRouteSnapshot, curr:  ActivatedRouteSnapshot): boolean


//############  路由复用策略时序图
import {DetachedRouteHandle, RouteReuseStrategy, ActivatedRouteSnapshot} from "@angular/router";

/**
 *
 * 【start】 ---> <shouldReuseRoute>   ---(false)---> <shouldDetach> ----(true)-->  【store】
 *                      |                                   |
 *                      (true)                           （false）
 *                      |                                   |
 *                 <shouldAttach>---（false）                |
 *                      |                |                  |
 *                     (true）           |                  |
 *                      |                |                  |
 *                  【retrieve】          |                  |
 *                      |                |                  |
 *                    【end】<------------|<-----------------|
 *
 */

export class SimpleReuseStrategy implements RouteReuseStrategy {
  // 静态属性
  public static cacheRouters: { [key: string]: DetachedRouteHandle } = {};

  /**
   * 路由离开，是否执行 store方法，存储当前路由快照
   * @param route
   */
  public shouldDetach(route: ActivatedRouteSnapshot): boolean {
    console.log("-----------shouldDetach-----------");
    console.log("route", route);
    if (route.routeConfig?.data) {
      return (route.routeConfig?.data as any).keepalive;
    }
    return false;
  }

  /**
   * path作为key值，存储路由快照
   * @param route
   * @param handle
   */
  public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    console.log("-----------store-----------");
    console.log("route", route);
    const url = this.getFullRouteURL(route);
    SimpleReuseStrategy.cacheRouters[url] = handle;
  }

  /**
   * 是否重新链接此路由，若重新链接，执行 retrieve方法， 从缓存中取路由快照
   * @param route
   */
  public shouldAttach(route: ActivatedRouteSnapshot): boolean {
    console.log("-----------shouldAttach-----------");
    const url = this.getFullRouteURL(route);
    console.log("route", route, url);
    return !!SimpleReuseStrategy.cacheRouters[url];
  }

  /**
   * path作为key值，从缓存中取路由快照
   * @param route
   */
  public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    console.log("-----------retrieve-----------");
    const url = this.getFullRouteURL(route);
    console.log("route", route, url);
    if (route.routeConfig?.data && (route.routeConfig.data as any).keepalive && !!SimpleReuseStrategy.cacheRouters[url]) {
      return SimpleReuseStrategy.cacheRouters[url];
    } else {
      return null;
    }
  }

  /**
   * 是否应复用路由
   * @param future
   * @param curr
   */
  public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    console.log("-----------shouldReuseRoute-----------");
    console.log("future", future);
    console.log("curr", curr);
    const b = future.routeConfig === curr.routeConfig && JSON.stringify(future.params) == JSON.stringify(curr.params) && JSON.stringify(future.queryParams) == JSON.stringify(curr.queryParams);
    console.log("是否应复用路由", b);
    return b;
  }

  /**
   * 类静态方法，调用方式 类名.方法
   * @param routepath
   * @private
   */
  public static deleteRouteSnapshot(routepath: string): void {
    let key_ = "";
    for (const key in this.cacheRouters) {
      if (routepath.indexOf(key) > -1) {
        key_ = key;
      }
    }
    if (key_) {
      delete this.cacheRouters[key_];
    }
  }


//获取完整路由路径
  private getFullRouteURL(route: ActivatedRouteSnapshot): string {
    const {pathFromRoot} = route;
    let fullRouteUrlPath: string[] = [];
    pathFromRoot.forEach((item: ActivatedRouteSnapshot) => {
      fullRouteUrlPath = fullRouteUrlPath.concat(this.getRouteUrlPath(item));
    });
    return `_${fullRouteUrlPath.join('_')}`;
  }

  private getRouteUrlPath(route: ActivatedRouteSnapshot) {
    return route.url.map(urlSegment => urlSegment.path);
  }
}
