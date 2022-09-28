import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from "@angular/router";
import {Menu, MenuTreeClose} from "../../../model/slider-menu.mode";


@Component({
  selector: 'app-slider-close',
  templateUrl: './slider-close.component.html',
  styleUrls: ['./slider-close.component.less']
})
export class SliderCloseComponent implements OnInit, OnChanges {
  @Input() menus: Menu[] = [];
  sliderMenus: MenuTreeClose[] = [];

  constructor(private router: Router) {
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.handMenuDatas();
  }

  /**
   * menus【表格数据】 转换为 slider-close-component需要的菜单格式数据【树形数据】
   */
  handMenuDatas(): void {
    this.sliderMenus = [];
    for (let i = 0; i < this.menus.length; i++) {
      const menuitem = this.menus[i] as Menu;
      const {id, leval, routepath} = menuitem;
      if (leval != 1) {
        continue;
      }
      //处理leval=1,一级菜单
      if (routepath) {
        //一级菜单
        this.sliderMenus.push({
          ...menuitem,
          label: menuitem.name,
          value: String(menuitem.id)
        });
      } else {
        //一级菜单组
        const temp: MenuTreeClose[] = [];
        this.menus.forEach((menu) => {
          const {parentId,name} = menu;
          if (parentId == id) {
            temp.push({
              ...menu,
              label: name,
              value: String(menuitem.id)
            })
          }
        });
        if (temp.length) {
          //该一级菜单组下面有二级菜单
          this.sliderMenus.push({
            ...menuitem,
            label: menuitem.name,
            value: String(menuitem.id),
            children: temp
          })
        }
      }
    }
    console.log('sliderMenus-close',this.sliderMenus);
  }


  menuchange(menu: MenuTreeClose) {
    this.router.navigate([menu.routepath])
  }

}
