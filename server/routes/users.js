const bcrypt = require('bcrypt')
const router = require('express').Router();
const User = require('../models/user');

console.log('in user routes')
const {GetuserDetails,addFriends,register,login}=require('../controllers/userController')

//FOR GETTING DETAILS OF THE PARTICULAR USER
router.get('/user-details',GetuserDetails)
router.post('/addfriend',addFriends)
router.post('/register',register)
router.post('/login',login)
router.post('/logout',logout)



module.exports = router
