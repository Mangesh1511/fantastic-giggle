

const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const { prev_contest_details, lastsubmissions, userdetails } = require('../user_queries')




exports.register = async (req, res) => {

  // console.log(req.url, req.method, req.body.username);
  const url = `http://localhost:5000/leaderboard/user-details`
  // const url=`https://leetcode.com/${req.username}/`
  axios.get(url,
    {
      data:
      {
        username: req.body.username
      }
    }
  )
    .then(async (resp) => {
      // console.log(req.body.username);
      // console.log('Response for finding the user is: ', resp.status);
      if (resp.status == 200) {
        try {

          const CheckUserAvailable = await User.findOne({ email: req.body.email })
          if (CheckUserAvailable == null && CheckUserAvailable == undefined) {
            // console.log("Checking whether the user with same credentials exit or not : ", CheckUserAvailable)
            const user = new User({
              username: req.body.username,
              email: req.body.email,
              password: req.body.password


            })
            const person = await user.save();
            // const token=jwt.sign({id:person._id,username:req.body.username,email:req.body.email},process.env.SECRET_KEY,{expiresIn:'30d'});
            res.status(200).json({ person: person });
          }
          else {
            res.status(400).json({ msg: 'You are already using this app please Login to continue with us!!' });
          }
        }
        catch (err) {
          // console.log('Internal server error is: ', err);
          res.status(500).json('Internal _ Server _Error');
        }

      }
      else {
        // console.log('Leet code user name err is : ', err);
        res.status(404).json('Enter the correct leetcode username!');
      }

    })
    .catch((err) => {
      // console.log('Leet code user name err is : ', err);
      res.status(404).json('Enter the correct leetcode username!');
    })
}



exports.login = async (req, res) => {
  console.log(req.method,req.url,req.body);
  try {

    const person= await User.findOne({ username: req.body.username });
    console.log('Identifying the user results are: ',person);
    if (person != null && person != undefined) {
      try {
        const ValidatePassword = User.findOne({ username: req.body.username, password: req.body.password });
        if (ValidatePassword != null && ValidatePassword != undefined) {

          // res.status(200).json({msg:'User logged in !!'});
          const token = jwt.sign({ id: person._id, username: req.body.username, email: req.body.email }, process.env.SECRET_KEY, { expiresIn: '30d' });
          res.status(200).cookie('token', token, { httpOnly: true }).json({ msg: 'User logged in !!' });

        }
        else {
          res.status(400).json({ msg: 'Enter the Correct Pasword!!' });
        }
      }
      catch (err) {
        console.log(err)
        res.status(400).json({ msg: 'Enter the Correct Pasword!!' });
      }

    }
    else
    {
      res.status(404).json('You are not registered with us ! Please Register ')
    }
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Internal Server Error!!' });
  }
}

exports.logout=async(req,res)=>{
  const acc_token=req.cookies.token;
  if(!acc_token!=null && acc_token!=undefined)
  {
    data=jwt.verify(acc_token,process.env.SECRET_KEY);
    const checkUser=await User.findOne({username:data.username});
    if(checkUser!=NULL && checkUser!=undefined)
    {
      console.log('ok found  matching details!!');


      res.clearCookie('jwtoken');
      res.redirect('/register');
      
      res.status(200).json('Logging Out');
    }
    else 
    res.status(404).json('Unauthorized access\n');
  }
  else
  {
    console.log('User already logged out!!');
    res.status(404).json('User is not logged in for logout');
  }
}

function attended(users) {
  if (users.attended == true)
    return users;
}
exports.GetuserDetails = async (req, response) => {
  const uname = req.body.username
  // console.log('usrename is: ', uname)
  const url = "https://leetcode.com/graphql";
  const body = {
    query: userdetails,
    variables: {
      username: `${uname}`,

    }
  };


  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",

    }
  })
    .then((resp) => resp.json())
    .then((data) => {
      data.data.userContestRankingHistory.reverse();
      const arr = [];
      for (const v of data.data.userContestRankingHistory) {
        if (v.attended)
          arr.push(v);
      }
      // console.log("number  of the attended contests are :", arr.length)
      if (arr.length > 3)
        data.data.userContestRankingHistory = arr.slice(0, 3)
      // else 
      // data.data.userContestRankingHistory=arr;
      response.status(200).json(data.data)



    })
    .catch((err) => {
      response.status(404).json(err);
    })
}

exports.addFriends = async (req, res) => {
  const friend_name = req.body.username;
  try
  {
  
  
  const acc_token = req.cookies.token;
  let data;
  if (acc_token != null && acc_token != undefined) {
    data = jwt.verify(acc_token, process.env.SECRET_KEY);
  }
  if (data != NULL && data != undefined) {
    const check = 1;
    const url = `https://leetcode.com/graphql/${friend_name}`;

    const user = await axios.get(url)
      .then((user) => {
        user.json();
        check = 0;
      })
      .catch((err) => {
        // console.log(err);
        res.status(404).json("User not found!!");
      })
    if (check === 0) {
      const person = await User.findOne(data.username)
      if (person != NULL && person != undefined) {
        if (!person.friends.includes(req.body.username)) {
          // await user.updateOne({ $push: { followers: userId } });
          await person.updateOne({ $push: { friends: req.body.username } });
          res.status(200).json("friend added to the your list");

        }
        else {
          res.status(203).json('Already Exists in the list');
        }
      }

    }
  }

  else {
    // console.log("user not found");
    res.status(401).json('Unauthorized access!!');
  }
  }
  catch(err)
  {
    console.log('User is not authenticated  use this path !!');
    res.status(401).json('Please login first to add friend!');
  }

}


