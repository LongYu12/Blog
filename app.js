var express = require('express')
var path = require('path')
var routerSession = require('./routers/session')
var routerPerson = require('./routers/personCenter')
var routerTopic = require('./routers/topic')
var bodyParser = require('body-parser')
var session = require('express-session')

//全局变量
var port = 8080

var app = express()


//公开资源配置
//path.join(__dirname, 'public')提供给express.static函数相对于启动node过程。如果从另一个目录运行Express应用程序，则使用要服务的目录的绝对路径更安全：
app.use('/public',express.static(path.join(__dirname, 'public')))
app.use('/node_modules/', express.static(path.join(__dirname,'./node_modules/')))

// 配置模板引擎
// 告诉express框架，当渲染后缀为.html的模板时，使用express-art-template
app.engine('html', require('express-art-template'));

// 配置解析表单 POST 请求提插件
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

//给 views 配置一个绝对路径更安全 默认视图页面在 views 下
app.set('views',path.join(__dirname,'./views/'))

// session的配置，通过 req.session 来访问session数据
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

//路由
app.use(routerSession)
app.use((routerPerson))
app.use(routerTopic)

app.listen(port, function () {
  console.log('runtime... http://127.0.0.1:8080');
})
