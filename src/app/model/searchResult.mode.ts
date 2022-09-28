export  interface PaginationObj{
   total:number;
   pageSize:number
}

export interface RoleListItem {
  id: number; // 角色id
  name: string; // 角色名称
  createTime: string; // 创建日期
}

export interface UserListItem{
  username:string;
}
