export interface LoginObj {
  username: string; //登入用户名
  pwd: string; //密码
}

export interface BreadCrumb {
  text: string; // 面包屑名称
  routepath: string; // 菜单路由访问路径
}

export interface EmitterObj {
  type: string; // 通知类型
  data: object; //通知内容
}

