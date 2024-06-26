const express = require('express')
const router = express.Router()
const users = require('../apis/UsersApi')


router.post('/adduser',users.adduser)
router.get('/allusers',users.getusers)
router.get('/deleteuser/:id',users.deleteUser)

module.exports=router