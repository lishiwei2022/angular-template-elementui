import {Component, OnInit} from '@angular/core';
import {ElTreeModelData} from "element-angular/release/tree/tree-props";
import ContextMenu from 'ja-contextmenu';
import MenuOption from "ja-contextmenu/types/interface/MenuOption";
import {MenuWrapper} from "ja-contextmenu/types/ContextMenu";
import {Router} from "@angular/router";
import {Menu} from "../../../model/slider-menu.mode";
import {SysService} from "../../../service/sys.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  eltreeDatas: ElTreeModelData[] = [];
  defaultExpandedKeys: number[] = [];  //默认展开的节点数组

  constructor(
    private sysService: SysService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getMenus();
    this.handContentMenu();
  }

  getMenus() {
    this.sysService.getMenus().subscribe((resp) => {
      const {status, data} = resp;
      if (status == "success") {
        const menuList = data?.list as Menu[];
        const elTreeModelData = this.toEltreeDatas(menuList, -1);
        this.eltreeDatas = [{
          label: '系统菜单_-1',
          id: -1,
          //expanded:true,
          children: elTreeModelData
        }];
        this.defaultExpandedKeys.push(this.eltreeDatas[0].id as number);  //默认【系统菜单】节点展开
      }
    });
  }

  /**
   * 表格数据转化为  树形数据(ElTreeModelData)
   * @param menus
   */
  toEltreeDatas(menus: Menu[], pid: number): ElTreeModelData[] {
    let elTreeModelData: ElTreeModelData[] = [];
    menus.forEach((menu) => {
      const {id, parentId, name} = menu;
      if (parentId == pid) {
        elTreeModelData.push({
          label: `${name}_${id}`,
          id: id,
          children: this.toEltreeDatas(menus, id)
        });
      }
    });
    return elTreeModelData;
  }

  handContentMenu(): void {
    const contextMenu = new ContextMenu({
      width: 200,   //菜单宽度
      fixMenuWhenScroll: false,  //滚动时菜单是否固定（需要设置 hideMenuWhenScroll=false）
      hideMenuWhenScroll: true //滚动时是否关闭菜单
    });
    const context = this;
    const option = {
      width: 200,
      items: [
        {
          label: '添加菜单',
          tip: '',
          onclick(e: any, payload: any) {
            const newNodeParentId = payload;  //点击的菜单就是要新增加节点的 父节点
            context.router.navigate(["sys/menu/add", {menuid: '-1', newnodeParentId: newNodeParentId}]);
          },
        },
        {type: '---'}, // divide line
        {
          label: '编辑菜单',
          tip: '',
          onclick(e: any, payload: any) {
            context.router.navigate(["sys/menu/edit", {menuid: payload, newnodeParentId: payload}]);
          },
          // children: {
          //   width: 120,
          //   items: [
          //     {
          //       label: 'sub menu1',
          //       onclick(e: any, payload: any) {
          //         console.log('menu1 click', payload);
          //       },
          //     }
          //   ]
          // }
        },
        {type: '---'}, // divide line
        {
          label: '删除菜单',
          tip: '',
          onclick(e: any, payload: any) {
            console.log('menu1 click', payload);
          },
        }
      ],
    } as MenuOption<any>
    const nowmenuInstance = contextMenu.create(option) as MenuWrapper<any>;
    setTimeout(() => {
      (document.getElementsByClassName('menu-page').item(0) as HTMLElement).oncontextmenu = (e) => {
        //通过dom找到 node name。 再通过node name 获取  nodeid 【el-tree可操作性太少没办法】
        const srcElement = e.srcElement as HTMLElement;
        const span = srcElement.getElementsByClassName('el-tree-node__label').item(0) as HTMLElement;
        const nodename = span.innerText.trim();
        const nodeid = nodename.split("_")[1];
        nowmenuInstance.show(e, nodeid)
      };
    }, 1000)
  }


  /**
   *  action 包括 close/open/click/checkbox 四种状态
   * @param e
   */
  selectNode(e: { label: string, treeNodeID: string | number, action: string, checked: boolean }): void {
    //this.selectnodeId = e.treeNodeID;
  }
}
