const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  adminVal:{
    type:Boolean,
    default:false
  },
  suspendre:{
    type:Boolean,
    default:false
  }
})

const User = mongoose.model('User',userSchema)

module.exports = User
