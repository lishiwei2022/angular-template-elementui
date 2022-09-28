import {Component, OnInit} from '@angular/core';
import {UtilService} from "../../service/util.service";
import {BreadCrumbService} from "../../service/bread-crumb.service";
import {Router} from "@angular/router";
import {Menu} from "../../model/slider-menu.mode";
import {SysService} from "../../service/sys.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent implements OnInit {
  pageHeight: string = "0px";
  sliderClose: boolean = false;
  menus: Menu[] = [];

  constructor(private util: UtilService,
              private sysService: SysService,
              private breadcrumbService: BreadCrumbService,
              private router: Router) {
    const wh = this.util.getWindowSize().h;
    this.pageHeight = wh + 'px';
  }

  ngOnInit(): void {
    this.getMenus();
  }

  getMenus(): void {
    this.menus.length = 0;
    this.sysService.getMenus().subscribe((resp) => {
      const {status, data} = resp;
      if (status == "success") {
        this.menus = data.list;
        //保存当前用户的权限菜单数据
        this.breadcrumbService.setMenuList(this.menus);
        this.breadcrumbService.setBreadCrumbs(this.router.url); //设置服务中最新的面包屑数据
        this.util.emitterChange({
          type: 'update_breadcrumb',
          data: {}
        });
      }
    });
  }

  sliderToggle(sliderClose: boolean): void {
    this.sliderClose = sliderClose;
  }
}
