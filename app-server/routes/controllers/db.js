//##########################
// 用户表
//username  pwd    token    createTime
//##########################
DB_USER = [{
  username: 'admin',
  pwd: '123',
  token: "",
  createTime: ''
}];
exports.users = DB_USER;

//##########################
// 角色表
// id  name  username
//#########################
DB_ROLE = [{
  id: 1,
  name: '系统管理员',
  username: ['admin'],
  createTime: Date.now()
}, {
  id: 2,
  name: '测试角色1',
  username: ['admin'],
  createTime: Date.now()
}, {
  id: 3,
  name: '测试角色2',
  username: ['admin'],
  createTime: Date.now()
}, {
  id: 4,
  name: '测试角色3',
  username: ['admin'],
  createTime: Date.now()
}, {
  id: 5,
  name: '测试角色4',
  username: ['admin'],
  createTime: Date.now()
}, {
  id: 6,
  name: '测试角色5',
  username: ['admin'],
  createTime: Date.now()
}, {
  id: 7,
  name: '测试角色6',
  username: ['admin'],
  createTime: Date.now()
}, {
  id: 8,
  name: '测试角色7',
  username: ['admin'],
  createTime: Date.now()
}, {
  id: 9,
  name: '测试角色8',
  username: ['admin'],
  createTime: Date.now()
}, {
  id: 10,
  name: '测试角色9',
  username: ['admin'],
  createTime: Date.now()
}, {
  id: 11,
  name: '测试角色10',
  username: ['admin'],
  createTime: Date.now()
}, {
  id: 12,
  name: '测试角色11',
  username: ['admin'],
  createTime: Date.now()
}];


exports.roles = DB_ROLE;

//##########################
//菜单表
// id  name  roleid  parentId
//#########################
DB_MENU = [{
  id: 100,
  name: '系统管理',
  icon: 'fa-cogs',  //添加菜单表单 非必填（非菜单页不需要）
  routepath: '',    //添加菜单表单 非必填（组【leval=1并且rputepath=''】不需要）
  roleid: [],       // 添加角色表单更新
  parentId: -1,      // 必须
  leval: 1, //菜单级别  1--一级菜单  2--二级菜单   3-非菜单页
}, {
  id: 101,
  name: '用户管理',
  icon: 'fa-user',
  routepath: '/sys/user',
  roleid: [1],
  parentId: 100,
  leval: 2
}, {
  id: 102,
  name: '角色管理',
  icon: 'fa-lock',
  routepath: '/sys/role',
  roleid: [1],
  parentId: 100,
  leval: 2
}, {
  id: 103,
  name: '菜单管理',
  icon: 'fa-square',
  routepath: '/sys/menu',
  roleid: [1],
  parentId: 100,
  leval: 2
}, {
  id: 104,
  name: 'demo表单',
  icon: 'fa-qrcode',
  routepath: '',
  roleid: [],
  parentId: -1,
  leval: 1
}, {
  id: 105,
  name: '表单',
  icon: 'fa-newspaper-o',
  routepath: '/sys/form',
  roleid: [1],
  parentId: 104,
  leval: 2
}, {
  id: 106,
  name: 'demo表格',
  icon: 'fa-table',
  routepath: '/sys/table',
  roleid: [1],
  parentId: -1,
  leval: 1
}, {
  id: 107,
  name: '菜单添加',
  icon: 'fa-square',
  routepath: '/sys/menu/add',
  roleid: [1],
  parentId: 103,
  leval: 3
}, {
  id: 108,
  name: '菜单编辑',
  icon: 'fa-square',
  routepath: '/sys/menu/edit',
  roleid: [1],
  parentId: 103,
  leval: 3
}];
exports.menus = DB_MENU;
