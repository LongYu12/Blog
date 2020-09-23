var mongoose = require('mongoose')

var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/Blogs');

var blogSchema = new Schema({
  id:{
    type:Number,
    required:true
  },
  title:{
    type:String,
    required:true
  },
  model:{
    type:String,
    required:true
  },
  created_time:{
    type:Date,
    // Date.now()获得时间戳，不加括号。就不会立马执行
    default:Date
  },
  content:{
    type:String,
    required:true
  },
  //头像图片
  author:{
    type:String,
    default:'路人'
  },


})

module.exports = mongoose.model('Blog', blogSchema)
