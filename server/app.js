require('./connection')
const express = require('express')
const axios = require('axios')
const User=require('./models/user')
const bodyParser = require('body-parser')
const app = express()
const fetch=require('cross-fetch')
app.use(bodyParser.urlencoded({ extended: true }));
const authRoutes=require('./routes/authenticate')
const userRoutes=require('./routes/users')
require('dotenv').config()

app.use(express.json())
app.use('/leaderboard/auth',authRoutes);
app.use('/leaderboard',userRoutes);

// app.use('/',(req,res)=>{

//   res.status(200).json({msg:'Welcome to the leaderboard app!! The Complete Node app!!'});
// })













app.listen(5000, () => {
  console.log('App is listening on port no 5000!!');
})


    