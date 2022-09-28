import {Component, Input, OnInit, OnChanges, SimpleChanges} from "@angular/core";
import {Router} from "@angular/router";
import {Menu, MenuTree} from "../../../model/slider-menu.mode";

@Component({
  selector: 'app-slider',
  templateUrl: 'slider.component.html',
  styleUrls: ["slider.component.less"]
})
export class SliderComponent implements OnInit, OnChanges {
  @Input() menus: Menu[] = [];
  activeMenuPath: string = ""; //根据路由地址确定 激活菜单，菜单的id用路由path
  onlyOneOpen: boolean = true; //每次打开一个   element-angular不起作用
  activeMenuPathList: string[] = []; //   element-angular不起作用
  sliderMenus: MenuTree[] = [];

  constructor(private router: Router) {
    this.activeMenuPath = this.router.url;  //当前 URL 只读
    //this.activeMenuPathList = [this.activeMenuPath]
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['menus']) {
      this.handMenuDatas();
    }
  }

  /**
   * menus【表格数据】 转换为 slider-component需要的菜单格式数据【树形数据】
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
          ...menuitem
        });
      } else {
        //一级菜单组
        const temp: MenuTree[] = [];
        this.menus.forEach((menu) => {
          const {parentId} = menu;
          if (parentId == id) {
            temp.push({
              ...menu
            })
          }
        });
        if (temp.length) {
          //该一级菜单组下面有二级菜单
          this.sliderMenus.push({
            ...menuitem,
            children: temp
          })
        }
      }
    }
    console.log('sliderMenus', this.sliderMenus);
  }

  menuchange(menupath: string) {
    this.router.navigate([menupath])
  }
}
