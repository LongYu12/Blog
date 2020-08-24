// 新建话题 、删除话题 、修改话题 、查看话题列表
var express = require('express')
var User = require('../models/user')
var md5 = require('md5')

// 配置
var routerPerson = express.Router()

// 个人主页
routerPerson.get('/information',function (req,res) {
  /*User.findOne({
    nickname:req.session.user.nickname
  },function (err, data) {
    if (err) {
      res.status(500).json({
        err_code:500,
        sucess:false
      })
    }else {
      res.status(200).json(data)
    }
  })
  console.log(req.session.user.nickname);
  res.send('fse')*/
  res.status(200).json({su:true})
})

// 导出
module.exports = routerPerson