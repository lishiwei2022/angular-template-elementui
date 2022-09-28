//接口
const express = require('express');
const router = express.Router();
const token = require("./controllers/token");
const sysController = require('./controllers/sys');
router.post("/getmenus", token.restrict_reqobj,token.restrict_token, sysController.getmenus); // 获取权限菜单
router.post("/getroles", token.restrict_reqobj,token.restrict_token, sysController.getroles); // 获取角色
router.post("/getAllroles", token.restrict_reqobj,token.restrict_token, sysController.getAllroles); // 获取角色
router.post("/getusers", token.restrict_reqobj,token.restrict_token, sysController.getusers); // 获取角色
module.exports = router;
