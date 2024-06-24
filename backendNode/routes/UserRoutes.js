const express = require('express')
const router = express.Router()
const users = require('../apis/users')


router.post('/adduser',users.adduser)
router.post('/login',users.login)
router.get('/allusers',users.getusers)
router.get('/deleteuser/:id',users.deleteUser)
router.post('/check',users.check)


module.exports=router