const mongoose = require('mongoose')

const postsSchema = new mongoose.Schema({
  nomEtude:{
    type:String,
  },
  dateInterview:{
    type:String,
  },
  heureInterview:{
    type:String,
  },
  nomEnqueter:{
    type:String,
  },
  codeEnqueteur:{
    type:String
  },
  nomEtude:{
    type:String,
  },
  numQuestionnaire:{
    type:String,
  },
  zoneEtude:{
    type:String,
  },
  pointCommencement:{
    type:String,
  },
  nomRepondant:{
    type:String,
  },
  ageRepondant:{
    type:String,
  },
  trancheAge:{
    type:String,
  },
  numTelRepondant:{
    type:String,
  },
  adresseMailRepondant:{
    type:String,
  },
  avenue:{
    type:String,
  },
  numDomicile:{
    type:String,
  },
  quartier:{
    type:String,
  },
  commune:{
    type:String,
  },
  nomSuperviseur:{
    type:String,
  },
  gps:{
    type:String,}
},{timestamps:true})

const Posts = mongoose.model('Posts',postsSchema)

module.exports = Posts
