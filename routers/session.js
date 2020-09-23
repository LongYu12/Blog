//登录、注册、退出会话
var express = require('express')
var User = require('../models/user')
var md5 = require('md5')
var Blog = require('../models/topic')

// 配置
var routerSession = express.Router()



// 首页
routerSession.get('/', function (req, res) {
  //console.log(req.session.user);
  Blog.find(function (errfind, blogs) {
    if (errfind){
      console.log(errfind);
    }

    // console.log(blogs);
    res.render('index.html',{
      user:req.session.user,
      blogs:blogs
    })
  })


})

// 登录前
routerSession.get('/login', function (req, res) {
  res.render('login.html')
})

// 登录后
routerSession.post('/login', function (req, res) {
  var user = req.body
  User.findOne({email: user.email},function (err, data) {
    if (err) {
      return res.status(200).json({
        err_code:500
      })
    }
    user.password = md5(md5(user.password))
    if (data === null || data.password !== user.password) {
      return  res.status(200).json({
        err_code:1
      })
    }else {
      console.log('登录用户：',user.email);
      req.session.user = data
      return  res.status(200).json({
        err_code:0
      })
    }
  })

})

// 注册
routerSession.get('/register', function (req, res) {
  res.render('register.html')
})

routerSession.post('/register', function (req, res) {
  // 1、获取表单数据
  // 2、操作数据
  // 3、响应请求
  var body = req.body
  // console.log(body);
  // new User({
  //       email: '553374668@qq.com',
  //       nickname: 'LongYu',
  //       password: '123456'
  //     }
  // ).save(function (err, rest) {
  //   console.log(err);
  //   console.log(rest);
  // })
  //对密码进行加密,多层加密，防破解
  body.password = md5(md5(body.password))
  User.findOne({
      $or:[
        {
          email:body.email
        },
        {
          nickname:body.nickname
        }
        ]
      },
      function (err,findUser) {
        // console.log('hear',err,findUser);
        if (err) {
        return res.status(500).json({
          err_code:1
        })
        }
        if (findUser) {
         // console.log('s',findUser);
          return res.status(200).json({
            err_code:1,
            message:'邮箱或呢称已存在'
          })
        }
         new User(body).save(function (err1, data1) {
           //console.log(data1);
           if (err1) {
             return res.status(500).json({
               err_code:500,
               message:'注册失败'
             })
           }
           // 记录登陆状态
           req.session.user = body
          console.log('用户：',body.email,'注册成功');
           res.status(200).json({
             err_code:0
           })
         })

  })
})

// 等出
routerSession.get('/logout', function (req, res) {
  if (req.session.user)
  {
    console.log('用户：',req.session.user.email,'退出登录');
  }
  req.session.user = null

  res.redirect('/login')
})

module.exports = routerSession
