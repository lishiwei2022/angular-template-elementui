//接口
const express = require('express');
const router = express.Router();
const token = require("./controllers/token");
router.get("/getSinkey", token.getsinkey); // 获取HmacSHA1加密参数
router.post("/login", token.restrict_reqobj, token.login);  //登入接口定义
module.exports = router;
