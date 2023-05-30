require('dotenv').config()
const User = require('../models/User')
const jwt = require('jsonwebtoken')

module.exports =  (req,res,next)=>{
  const token = req.headers.authorization.split(' ')[1]

  if(!token){
    return res.status(401).json({error:'Veuillez vous connecter pour generer un token!!!'})
  }

  jwt.verify(token,process.env.SECRET_KEY,async(err,payload)=>{
    if(err){
      return res.json({error:'Veuillez vous connecter jjj!!!'})
    }
    const {_id } = payload
    const user = await User.findById({_id})
    req.user = user
    next()
  })
}
