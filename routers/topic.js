// 新建话题 、删除话题 、修改话题 、查看话题列表
var express = require('express')
var User = require('../models/user')
var md5 = require('md5')

// 配置
var routertopic = express.Router()


// 导出
module.exports = routertopic