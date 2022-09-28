import {Component, OnInit} from "@angular/core";
import {OpenTab, TabRouter} from "../../../model/tab.mode";
import {TabRouterService} from "../../../service/tab-router.service";
import {UtilService} from "../../../service/util.service";
import {Router} from "@angular/router";
import {sessionStorageService} from "../../../service/sessionStorage.service";
import {ElMessageService} from "element-angular";
import {SimpleReuseStrategy} from "../../../util/route/SimpleReuseStrategy";

@Component({
  selector: 'app-content-tabs',
  templateUrl: 'content-tabs.component.html',
  styleUrls: ["content-tabs.component.less"]
})
export class ContentTabsComponent implements OnInit {
  openTabs: OpenTab[];
  openTabRouters: TabRouter[];

  constructor(private tabRouterService: TabRouterService,
              private utilService: UtilService,
              private router: Router,
              private sessionService: sessionStorageService,
              private message: ElMessageService) {
    this.openTabs = [];
    this.openTabRouters = [];
    this.utilService.emitter.subscribe((resp) => {
      const {type, data} = resp;
      if (type == "update_tabs") {
        this.openTabRouters = this.tabRouterService.getOpenTabRouters();
        console.log('opentabrouters', this.openTabRouters);
        this.openTabs = this.openTabRouters.map((opentabrouter) => {
          const {title, selected} = opentabrouter;
          return {
            name: title,
            selected: selected ? selected : false,
            type: selected ? 'danger' : 'primary',   // 激活的tab用  danger ，  其他的用 primary
            tabRouter: opentabrouter
          }
        });
      }
    });
  }


  ngOnInit() {
    this.tabRouterService.injectComponentMethod(this.closeTab.bind(this));
  }

  /**
   * 激活选中的tab页
   * @param tab
   */
  activeTab(tab: OpenTab): void {
    const {tabRouter} = tab;
    const module = tabRouter.module;
    const params = tabRouter.params; // 路由可选参数
    const queryParams = tabRouter.queryParams; //路由查询参数
    let skipLocationChangev: boolean = false;  //true，路由参数隐藏，但地址栏不变化了（路由映射不改变）
    if ((params && Object.keys(params).length) || (queryParams && Object.keys(queryParams).length)) {
      //skipLocationChangev = true;
    }
    this.router.navigate([module, params], {queryParams: queryParams, skipLocationChange: skipLocationChangev});
  }

  /**
   * 关闭选中的tab页
   * @param tab
   */
  closeTab(tab: OpenTab, index: number): void {
    const {tabRouter, selected} = tab;
    if (this.openTabRouters.length == 1) {
      //只有一个tab页 不允许关闭了
      this.message.setOptions({showClose: true}); // 设置Message消息提示框可关闭
      this.message['warning']("只有一个标签不可关闭");
      return
    }
    this.openTabs.splice(index, 1);
    this.openTabRouters.splice(index, 1);
    this.tabRouterService.setOpenTabRouters(this.openTabRouters);
    this.sessionService.setObj('openTabRouters', this.openTabRouters);
    //删除路由复用
    SimpleReuseStrategy.deleteRouteSnapshot(tabRouter.routepath);
    if (selected) {
      //关闭激活的tab页， 那么关闭它，并把它的的上一个tab激活 ,如果没有上一个tab了，那就激活最后一个tab（循环）
      const preIndex = index - 1;
      if (preIndex > -1) {
        // 还有上一个tab
        const preTab = this.openTabs[preIndex] as OpenTab;
        this.activeTab(preTab);
      } else {
        // 上一个tab没有了，激活最后一个tab
        const lastTab = this.openTabs[this.openTabs.length - 1] as OpenTab;
        this.activeTab(lastTab)
      }
    }
  }
}
