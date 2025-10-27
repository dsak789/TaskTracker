const express = require("express");
const router = express.Router();
const users = require("../apisV2/UsersApi");
const password = require("../apisV2/PasswordReset");
const updates = require("../apisV2/NewUpdateMails");
const { authenticate } = require("../middlewares/authMiddle");

router.post("/adduser", users.adduser);
router.post("/login", users.login);
router.get("/allusers", authenticate, users.getusers);
router.get("/deleteuser/",authenticate, users.deleteUser);
router.post("/forgotpassword/", password.reset_password);
router.post("/changepassword", authenticate, password.changePassword);
router.get("/postupdate", updates.send_new_update_info);
module.exports = router;
