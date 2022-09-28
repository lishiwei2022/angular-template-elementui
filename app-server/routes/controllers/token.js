const CryptoJS = require("crypto-js");
const sinkey = "123"; //HmacSHA1加密参数
exports.sinkey = sinkey;
const key = "7ed0a55691534aa8a9a692d373deeee8";
const iv = "6bSWAnEG/f2onZ7S";
token_expirationTime = 30 * 60 * 1000; // token失效时间
const _ = require('lodash');
const DB =require('./db');

exports.getsinkey = async function (req, res) {
  console.log('请求---token/getSinkey----start ////')
  console.log({sinkey: sinkey});
  console.log('请求---token/getSinkey----end ////')
  res.send({
    status: 'success',
    data: {
      sinkey: sinkey
    }
  });
  return false;
}
/**
 * 校验请求参数是否被篡改
 * @param req
 * @param res
 * @param next
 */
exports.restrict_reqobj = function (req, res, next) {
  const headers = req.rawHeaders;
  const sinkeyIndex = headers.indexOf("xc_client_sessionid");
  const Content_SignatureIndex = headers.indexOf("Content-Signature");
  let sinkeyValue_Index = -1, content_signatureIndex = -1;
  let sinkeyValue, content_signature;
  if (sinkeyIndex > -1) {
    sinkeyValue_Index = sinkeyIndex + 1;
  }
  if (Content_SignatureIndex > -1) {
    content_signatureIndex = Content_SignatureIndex + 1;
  }
  if (sinkeyValue_Index > -1) {
    sinkeyValue = headers[sinkeyValue_Index];
  }
  if (content_signatureIndex > -1) {
    content_signature = headers[content_signatureIndex];
  }
  //########sinkey是否被篡改
  if (sinkey == sinkeyValue) {
    const reqobj = req.body;
    const sinkeyReqStr = getSignReqobj(sinkeyValue, JSON.stringify(reqobj));  //对请求体 HmacSHA1加密
    //####### 请求体内容是否被篡改
    if (sinkeyReqStr == content_signature) {
      next();
    } else {
      res.send({
        status: 'fail_change',
        data: {
          err: "请求内容被篡改"
        }
      });
    }
  } else {
    res.send({
      status: 'fail_change',
      data: {
        err: "请求内容被篡改"
      }
    });
  }
  return false
}

function getHeaderToken(req) {
  const headers = req.rawHeaders;
  const tokenIndex = headers.indexOf("xc_sso_sessionid");
  let tokenValue_Index = -1;
  let tokenValue;
  if (tokenIndex > -1) {
    tokenValue_Index = tokenIndex + 1;
  }
  if (tokenValue_Index > -1) {
    tokenValue = headers[tokenValue_Index];
  }
  return tokenValue;
}

exports.getHeaderToken = getHeaderToken;
/**
 * 模拟后端token的校验函数
 * @param req
 * @param res
 * @param next
 */
exports.restrict_token = function (req, res, next) {
  const tokenValue = getHeaderToken(req);
  //判断token是否失效
  const tokenCreateTime = DB.users.find((item) => {
    return item.token = tokenValue
  }).createTime;

  if (Date.now() - tokenCreateTime > token_expirationTime) {
    // token失效
    res.send({
      status: 'fail_express',
      data: {
        err: "token失效"
      }
    })
  } else {
    next();
  }
  return false
}
exports.login = async function (req, res) {
  const dataBase_users = DB.users;
  try {
    //拿到前端请求的加密数据，用相同的方法解密
    const username_aes = req.body.username;
    const pwd_aes = req.body.pwd;
    const username_dae = daesString(username_aes);
    const pwd_dae = daesString(pwd_aes);
    console.log("username=" + username_dae);
    console.log("pwd=" + pwd_dae);
    //判断登入账号是否在数据库中
    const userIn = dataBase_users.some((user) => {
      const {username, pwd} = user;
      return username == username_dae && pwd == pwd_dae
    });
    if (userIn) {
      console.log("请求---token/login----start////");
      console.log({
        token: createToken(username_dae).token
      });
      console.log("请求---token/login----end////");
      res.send({
        status: 'success',
        data: {
          token: createToken(username_dae).token
        }
      })
    } else {
      console.log("请求---token/login----start////");
      console.log({
        err: '账号或者密码不正确'
      });
      console.log("请求---token/login----end////");
      res.send({
        status: 'fail',
        data: {
          err: '账号或者密码不正确'
        }
      })
    }
  } catch (e) {
    console.log("请求---token/login----start////");
    console.log({
      err: ''
    });
    console.log("请求---token/login----end////");
    res.send({
      status: 'fail',
      data: {
        err: ''
      }
    })
  }
  return false;
}



/**
 * aes加密
 * @param s  符串或者json字符串
 * @returns {string}
 */
exports.aesString = function (s) {
  const key_ = CryptoJS.enc.Utf8.parse(key);
  const iv_ = CryptoJS.enc.Utf8.parse(iv);
  const encrypted = CryptoJS.AES.encrypt(s, key_, {
    iv: iv_,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

/**
 * aes 解密
 * @param encrypted---aes 加密数据
 */
 function daesString(encrypted) {
  const key_ = CryptoJS.enc.Utf8.parse(key);
  const iv_ = CryptoJS.enc.Utf8.parse(iv);
  const decrypted = CryptoJS.AES.decrypt(encrypted, key_, {
    iv: iv_,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
exports.daesString =daesString;
/**
 * HmacSHA1加密
 * @param value
 * @returns {string}
 */
function getSignReqobj(sinkey, value) {
  const sha1_result = CryptoJS.HmacSHA1(value, sinkey);
  const result = CryptoJS.enc.Base64.stringify(sha1_result);
  return result;
}

exports.getSignReqobj = getSignReqobj;

/**
 * 创建token
 * @returns {number}
 */
 function createToken(username) {
  const token = _.uniqueId('token_');
  const createTime = Date.now();
  saveToken(username, token, createTime);
  return {
    token: `${username}_${token}`,
    createTime: createTime
  }
}
exports.createToken
//##########################
//username  pwd    token    createTime
//token写入用户表
//##########################
function saveToken(username, token, createTime) {
  const dbusers = DB.users.map((item) => {
    const {username, token, createTime} = item;
    return username;
  });
  const userNameIndex = dbusers.indexOf(username);
  if (userNameIndex > -1) {
    // 更新用户token
    const itUser = DB.users[userNameIndex];
    itUser.token = token;
    itUser.createTime = createTime;
  }
}

