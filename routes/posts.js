const router = require('express').Router()
const Posts = require('../models/Posts')
const verifyToken = require('../middleware/verifyToken')

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

module.exports = router
