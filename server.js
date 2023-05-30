const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const flash = require("connect-flash");
const cors = require('cors')
env.config();
const authRoutes = require('./routes/user')
const postsRoutes = require('./routes/posts')

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log(err));

const app = express();
app.use(cors({
  origin:'http://localhost:19006',
  methods:["POST","GET"]
}))
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//routes
app.get('/', (req,res)=>{
  res.send('les gens')
})

//middleware
app.use(authRoutes)
app.use(postsRoutes)


app.listen(port, () => {
  console.log("the server is running on port " + port);
});
