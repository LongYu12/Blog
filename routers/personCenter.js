// 新建话题 、删除话题 、修改话题 、查看话题列表
var express = require('express')
var User = require('../models/user')
var md5 = require('md5')

// 配置
var routerPerson = express.Router()

// 个人主页
routerPerson.get('/Information',function (req,res) {
   req.session.user.email
  User.findOne({email:req.session.user.email}, function (errfind, user) {
    if (errfind)
      console.log(errfind);
    // console.log(user);
    res.render('./settings/profile.html',{
      user:user
    })
  })

})

// 导出
module.exports = routerPerson
