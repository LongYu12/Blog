var mongoose = require('mongoose')

var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/Bloguser');

var userSchema = new Schema({
  email:{
    type:String,
    required:true
  },
  nickname:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  created_time:{
    type:Date,
    // Date.now()获得时间戳，不加括号。就不会立马执行
    default:Date.now
  },
  last_modified_time:{
    type:Date,
    default:Date.now
  },
  //头像图片
  avator:{
    type:String,
    default:'/public/img/avatar-default.png'
  },
  //简介
  bio:{
    type:String,
    default:''
  },
  //性别
  gender:{
    type:Number,
    //限制数值范围
    enum:[-1,0.1],
    default:-1
  },
  birthday:{
    type:Date
  },
  //权限设置
  status:{
    type:Number,
    /*
    * 0: 没有限制
    * 1:不可以评论
    * 2：不可以登录
    * */
    enum: [0,1,2],
    default:0
  }

})

module.exports = mongoose.model('User', userSchema)
