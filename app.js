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

app.get('/:username', (req, response) => {
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
    fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",

      }
    })
      .then(res => res.json())
      .then(data => {
        attendedContests = []

        if(data.data. userContestRankingHistory.length>3)
        {
          for(const v of data.data.userContestRankingHistory)
          {
            if(v.attended==true)
            {
              attendedContests.push(v)
            }
          }
        }
          if(attendedContests>3)
          data.data.userContestRankingHistory=(attendedContests.reverse()).slice(0,3)
          else data.data.userContestRankingHistory=attendedContests
        

        response.status(200).json(data)



      }
      )
  }
  catch (err) {
    console.log(err)
    response.json(err)
  }




})





app.listen(5000, () => {
  console.log('App is listening on port no 5000!!');
})


    