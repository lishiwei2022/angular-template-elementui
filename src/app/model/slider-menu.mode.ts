//和服务端DB中的一致
export interface Menu {
  id: number,
  name: string,
  icon: string,
  routepath: string, // 有值（一级菜单）     无值(一级菜单组)
  roleid: number[],
  parentId: number,
  leval: number  //1--一级菜单  2--二级菜单  3---非菜单页面
}


/**
 * 树形结构1
 */
export interface MenuTree {
  id: number; // 菜单id
  name: string; //菜单名称
  icon: string; //菜单图标
  routepath: string; //菜单路由访问路径
  children?: MenuTree[],
}


export  interface  MenuTreeClose{
  value: string; // 菜单id
  label: string; //菜单名称
  id: number; // 菜单id
  name: string; //菜单名称
  icon: string; //菜单图标
  routepath: string; //菜单路由访问路径
  roleid: number[]; // 角色id
  children?: any[]
}
