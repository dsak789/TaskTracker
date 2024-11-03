const express = require('express')
const router = express.Router()
const users = require('../apis/UsersApi')
const password = require('../apis/PasswordReset')
const updates = require('../apis/NewUpdateMails')

router.post('/adduser',users.adduser)
router.post('/login',users.login)
router.get('/allusers',users.getusers)
router.get('/deleteuser/:id',users.deleteUser)
router.post('/forgotpassword/',password.reset_password)
router.post('/changepassword',password.changePassword)
router.get('/postupdate',updates.send_new_update_info)
module.exports=router