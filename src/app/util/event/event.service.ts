import {EventEmitter, Injectable} from "@angular/core";
import * as url from "url";

@Injectable({
  providedIn: 'root'
})

export class EventService {
  public $eventEmitter: EventEmitter<any>;

  constructor() {
    this.$eventEmitter = new EventEmitter<any>();
  }

  public emitChange(msg: any): void {
    this.$eventEmitter.emit(msg);
  }

  /**
   * 需要重新请求数据的   路由复用的列表页的 路由变化订阅实例
   * key: 路由复用的列表页 路由访问路径   value: 路由变化订阅实例, 初始化为null(没有)
   */
  public componentListRefreshMap = {
    'sys/user': null,
    'sys/role': null
  }

  public setComponentSubscibleInstance(url: string, componentSubscibleInstance: any): void {
    this.componentListRefreshMap[url] = componentSubscibleInstance;
  }

  public getComponentSubscribleInstance(url: string): any {
    return this.componentListRefreshMap[url];
  }

  /**
   *
   * @param componentUrl     路由复用的列表页 路由访问路径
   * @param callback         匹配到的页面  回调
   * @param netmatchBack     未匹配到的页面  回调
   */
  public refreshComponentSubscible(componentUrl: string, callback?: Function, netmatchBack?: Function): void {
    let componentSubscibleInstance = this.getComponentSubscribleInstance(componentUrl);
    if (componentSubscibleInstance == null) {

    } else {
      componentSubscibleInstance.unsubscribe();  // 存在取消该订阅，开启新的订阅
    }
    componentSubscibleInstance = this.$eventEmitter.subscribe((obj) => {
      let newcomponentUrl;
      const {type, componentPath} = obj;
      newcomponentUrl = componentPath;
      if (type == "refreshList") {
        const num = componentPath.indexOf(componentUrl);
        if (num > -1 && num == newcomponentUrl.length - componentUrl.length) {
          callback ? callback() : ''
        } else {
          //不匹配也需要处理的组件
          netmatchBack ? netmatchBack() : '';
        }
      }
    });
    this.setComponentSubscibleInstance(componentUrl, componentSubscibleInstance);
  }
}
