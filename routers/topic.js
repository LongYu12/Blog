// 新建话题 、删除话题 、修改话题 、查看话题列表
var express = require('express')
var Blog = require('../models/topic')
var md5 = require('md5')

// 配置
var routertopic = express.Router()

//写博客
routertopic.get('/new',function (req, res) {
  res.render('./topic/new.html',{
    user:req.session.user
  })
})

routertopic.post('/new', function (req, res) {
  console.log(req.body);
  var body = req.body
  body.id = 1
  Blog.find(function (err, blogs) {
    if (err)
      console.log('errall',err);
    console.log(blogs);
    body.id = blogs.length+1
    new Blog(body).save(function (err1, blog) {
      console.log(blog);
      if (err1)
        res.status(500).json({
          err_code : 1
        })
      res.status(200).json({
        err_code : 0
      })
    })

  })

})

//查看博客
routertopic.get('/show',function (req, res) {
  // console.log(req.query);
  var id = parseInt(req.query.id)
  Blog.findOne({id:id},function (errfind, blogs) {
    if (errfind)
      console.log(errfind);
    res.render('./topic/show.html',{
      user:req.session.user,
      blogs:blogs
    })
  })

})

// 导出
module.exports = routertopic
