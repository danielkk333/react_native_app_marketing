const router = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const verifyToken = require('../middleware/verifyToken')
const nodemailer = require("nodemailer");

// nodemailer
async function mailer(recieveremail, code) {


    let transporter = nodemailer.createTransport({
        host: "mail56.lwspanel.com",
        port: 587,

        secure: false, // true for 465, false for other ports
        requireTLS: true,
        auth: {
            user: "entreprise@carketingrdc.com", // generated ethereal user
            pass: "2022carketingR$", // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'entreprise@carketingrdc.com', // sender address
        to: `${recieveremail}`, // list of receivers
        subject: "Verification pour recuperation du mot de passe", // Subject line
        text: `Votre de verification est ${code}`, // plain text body
        html: `<b>Votre de verification est ${code}</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}


router.post('/signup',async (req,res)=>{
  const {name, email, password } = req.body
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  try{
    await User.findOne({email}).then(async (savedUser) => {
      if(savedUser){
        return res.json({error: 'Ce mail existe deja'})
      }
      const newUser = new User({name, email, password:hashedPass})
      try{
        await newUser.save()
        // res.status(200).json({message:'Enregistrer avec success'})
        const token = jwt.sign({_id:newUser._id},process.env.SECRET_KEY)
        res.status(200).json(token)
      }catch(err){
        res.status(422).json({error:err.message})
      }
    })
  }catch(e){
    console.log(e.message);
  }
})

router.post('/signin',async (req,res)=>{
  const {email, password} =req.body
try{
    const savedUser = await User.findOne({email:email})
    if(!savedUser){
      return res.json({error:'Identifiant incorrect'})
    }else{
      try{
        await bcrypt.compare(password,savedUser.password,(err,result)=>{
          if(result){
            const token = jwt.sign({_id:savedUser._id},process.env.SECRET_KEY,{expiresIn:'7d'})
            const {password, ...others} = savedUser
            res.status(200).json({token,others})
          }else{
            return res.json({error:'Identifiant incorrect'})
          }
        })
      }catch(err){
        console.log(err);
      }
    }
}catch(e){
  console.log(e.messgae);
}
})

router.get('/profile',verifyToken, async(req,res)=>{
  if(!req.user){
    return res.json({success:false, error:'Veuillez vous connecter kkkk !!!'})
  }else{
    return res.json({
      success:true,
      name:req.user.name,
      email:req.user.email
    })
  }
})

router.get('/allUser', async(req,res)=>{
  const result = await User.find()
  res.json(result)
})

router.post('/recuperation_password',async (req,res) => {
  const {email} = req.body

  const user = await User.findOne({email:email})
  if(user){
    try {
      let verificationCode = Math.floor(100000 + Math.random() * 900000);
      await mailer(email,verificationCode)
      res.json({message:'Le code de verification a été envoye',success:true,verificationCode,user})
      console.log('good');
    } catch (e) {
      console.log(e.message);
    }
  }else{
    res.json({message:"Cet email n'existe pas"})
  }

})

router.post('/creer_nouveau_password', async (req,res) => {
  const { password,email } = req.body;
  console.log(req.body);
  const user = await User.findOne({email:email})

  if(user){
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    await User.updateOne({ _id: user._id }, { $set: { password: hashedPass } });
    res.json({message:'vous avez mis votre mot de passe a jour avec success',success:true})
  }else{
    res.json({success:false})
  }
})


module.exports = router
