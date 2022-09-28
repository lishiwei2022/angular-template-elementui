import {Injectable} from "@angular/core";
import {BreadCrumb} from "../model/author.mode";
import {ElBreadcrumb} from "element-angular";
import {Menu} from "../model/slider-menu.mode";

@Injectable({
  providedIn: 'root'
})
export class BreadCrumbService {
  private menuList: Menu[] = [];
  private breadCrumbList: BreadCrumb[] = [];
  private menuTreeHash: any = {};

  constructor() {

  }

  setMenuList(menus: Menu[]): void {
    this.menuList = menus;
  }

  getMenuTree(): Menu[] {
    return this.menuList;
  }

  /**
   *
   * @param nowRotePath  可能有可选参数 params 或者 查询参数queryParams
   */
  setBreadCrumbs(nowRotePath: string): void {
    this.breadCrumbList.length = 0;
    //nowRotePath ----> id
    let mappingId: any = null;
    this.menuList.forEach((menu) => {
      const {id, routepath} = menu;
      if (routepath && nowRotePath.indexOf(routepath) > -1) {
        mappingId = id;
      }
    });
    this.handBreadDataById(mappingId);
  }

  getBreadCrumbs(): BreadCrumb[] {
    return this.breadCrumbList;
  }


  handBreadDataById(idv: number | null): void {
    if (!idv) {
      //刷新页面，路由变化中的， setBreadCrumbs 方法，  this.menuList 还没数据
      return
    }
    this.menuList.forEach((menu) => {
      const {id, leval, parentId, name, routepath} = menu;
      if (idv == id) {
        this.breadCrumbList.unshift({
          text: name,
          routepath: routepath
        });
        if (leval != 1) {
          this.handBreadDataById(parentId);
        }
      }
    });
  }
}
