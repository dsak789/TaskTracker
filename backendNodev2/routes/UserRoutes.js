const express = require('express')
const router = express.Router()
const users = require('../apis/UsersApi')



router.get('/allusers',users.getusers)



module.exports=router