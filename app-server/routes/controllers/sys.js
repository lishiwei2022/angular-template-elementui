const token = require("./token");
const DB = require("./db");
exports.getmenus = async function (req, res) {
  const token_ = token.getHeaderToken(req);
  //根据token在user中查询到 username
  let username_ = DB.users.find((item) => {
    return item.token = token_;
  }).username;
  console.log("username_", username_)
  //根据username 在 role中查询到 roleid 【本示例 只取一个角色】
  const roleId_ = DB.roles.find((item) => {
    return item.username.includes(username_);
  }).id;
  console.log("roleId_", roleId_)
  // 根据roleid 在 menu中查询 关联的菜单
  const menus = DB.menus.filter((item) => {
    return item.roleid.includes(roleId_) || !item.roleid.length
  });
  console.log("请求---sys/getmenus--- start/////");
  console.log({
    list: menus ? menus : []
  });
  console.log("请求---sys/getmenus--- end/////");
  res.send({
    status: 'success',
    data: {
      list: menus ? menus : []
    }
  });
  return false;
}

exports.getroles = async function (req, res) {
  const token_ = token.getHeaderToken(req);
  //根据token在user中查询到 username
  let username_ = DB.users.find((item) => {
    return item.token = token_;
  }).username;
  console.log("username_", username_)
  const dbRoles = DB.roles;
  //获取token对应账号的 角色列表
  const token_dbroles = dbRoles.filter((role) => {
    return role.username.includes(username_)
  });
  //分页
  const pagesize = req.body.pageSize;
  const pagenum = req.body.pageNumber;  // 前端传1 表示第一页
  const startIndex = (pagenum - 1) * pagesize;
  const endIndex = pagenum * pagesize;
  const pageData = token_dbroles.slice(startIndex, endIndex);
  console.log("请求---sys/getroles 分页--- start/////");
  console.log("第"+pagenum+"页", '每页'+pagesize+"数据")
  console.log({
    total: token_dbroles.length,
    list: pageData ? pageData : []
  });
  console.log("请求---sys/getmenus--- end/////");
  res.send({
    status: 'success',
    data: {
      total: token_dbroles.length,
      list: pageData ? pageData : []
    }
  });
  return false;
}

exports.getAllroles = async function (req, res) {
  const token_ = token.getHeaderToken(req);
  //根据token在user中查询到 username
  let username_ = DB.users.find((item) => {
    return item.token = token_;
  }).username;
  console.log("username_", username_)
  const dbRoles = DB.roles;
  //获取token对应账号的 角色列表
  const token_dbroles = dbRoles.filter((role) => {
    return role.username.includes(username_)
  });
  console.log("请求---sys/getAllroles --- start/////");
  console.log({
    total: token_dbroles.length,
    list: token_dbroles
  });
  console.log("请求---sys/getAllroles--- end/////");
  res.send({
    status: 'success',
    data: {
      total: token_dbroles.length,
      list: token_dbroles
    }
  });
  return false;
}

exports.getusers = async function (req, res) {
  const pagesize = req.body.pageSize;
  const pagenum = req.body.pageNumber;  // 前端传1 表示第一页
  const startIndex = (pagenum - 1) * pagesize;
  const endIndex = pagenum * pagesize;
  const pageData = DB.users.slice(startIndex, endIndex);
  console.log("请求---sys/getusers 分页--- start/////");
  console.log("第"+pagenum+"页", '每页'+pagesize+"数据")
  console.log({
    total: pageData.length,
    list: pageData ? pageData : []
  });
  console.log("请求---sys/getusers--- end/////");
  res.send({
    status: 'success',
    data: {
      total: pageData.length,
      list: pageData ? pageData : []
    }
  });
  return false;
}
