require('./connection')
const express = require('express')
const axios = require('axios')
const User=require('./modules/user')
const bodyParser = require('body-parser')
const { prev_contest_details, lastsubmissions, userdetails } = require('./user_queries')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
// const authRoutes=require('./routes/authenticate')


// app.use('/lcf/auth',authRoutes)
app.get('/',(req,res)=>{
  console.log('No user defined please define the user')

  res.status(200).json('No user defined please define the user')
})

app.get('/leaderboard/user-details', async (req, response) => {
  uname=req.params.username;
  console.log(uname)
  const url = "https://leetcode.com/graphql";
  const body = {
    query: userdetails,
    variables: {
      username: `${uname}`,
     
    }
  };

  try {
   const resp= await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",

      }
    })
      
    const data=await resp.json()

    response.status(200).json(data)
  }
  catch (err) {
    console.log(err)
    response.json(err)
  }




})


app.get('/:username',(req,res)=>{

  uname=req.params.username;
  console.log(uname)
  const url = "https://leetcode.com/graphql";
  const body = {
    query: userdetails,
    variables: {
      username: `${uname}`,
     
    }
  };


})


app.listen(5000, () => {
  console.log('App is listening on port no 5000!!');
})


    