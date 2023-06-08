const router = require('express').Router()
const Posts = require('../models/Posts')
const verifyToken = require('../middleware/verifyToken')
const env = require("dotenv");
const mongoose = require("mongoose");


router.post('/createPosts',verifyToken,async (req,res)=>{
  const {nomEtude,dateInterview,heureInterview,nomEnqueter,codeEnqueteur,numQuestionnaire,
    zoneEtude,pointCommencement,nomRepondant,ageRepondant,trancheAge,numTelRepondant,adresseMailRepondant,
    avenue,numDomicile,quartier,commune,nomSuperviseur,gps,dureeInterview} = req.body
    console.log(req.body);
  const user = req.user.email

  try{
    const newPost = new Posts ({
      nomEtude,dateInterview,heureInterview,nomEnqueter,codeEnqueteur,numQuestionnaire,
        zoneEtude,pointCommencement,nomRepondant,ageRepondant,trancheAge,numTelRepondant,adresseMailRepondant,
        avenue,numDomicile,quartier,commune,nomSuperviseur,gps,dureeInterview
    })
    const savedPost = await newPost.save()
    res.json({success:true,savedPost})
  }catch(err){
    res.json(err.message)
  }
})

router.get('/getAllData',verifyToken, async(req,res) => {
  try {
    const posts = await Posts.find().limit(10).sort({_id:-1})
    res.json({success:true,posts})
  } catch (e) {
    res.json(err.message)
  }

})

router.post('/deletePosts/:id',verifyToken, async(req,res) => {
  const id = req.params.id

  const result = await Posts.findOne({_id:id})
  if(result){
    await Posts.deleteOne({_id:id})
    res.json({success:true})
  }else{
    res.json({error:'could not delete',success:false})
  }
})

router.get('/deleteAll', async(req,res)=>{
  try{
    await Posts.deleteMany()
    res.json({success:true,message:'vous avez tout effacé'})
  }catch(e){
    console.log(e.message);
    res.json({success:false})
  }
})

module.exports = router
