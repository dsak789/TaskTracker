const User = require("../models/UsersSchema");
const bcrypt = require("bcrypt");
const reg_mail = require("./RegisterMail");
const { genToken } = require("../middlewares/JWTAuth");

const verifypwd = async (pwd, encpwd) => {
  try {
    const verify = await bcrypt.compare(pwd, encpwd);
    return verify;
  } catch (error) {
    console.log(error.message);
  }
};

const encyptpwd = async (pwd) => {
  try {
    const salt = await bcrypt.genSalt(7);
    const encpwd = await bcrypt.hash(pwd, salt);
    return encpwd;
  } catch (error) {
    console.log(error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: `${username}` });
    if (user) {
      if (await verifypwd(password, user.password)) {
        const gitdata = await (
          await fetch(`https://api.github.com/users/${user.githubid}`)
        ).json();
        const userData = {
          name: user.name,
          username: user.username,
          githubid: user.githubid,
          email: user.email,
          dp_url:
            gitdata.avatar_url ||
            "https://static.vecteezy.com/system/resources/previews/000/649/115/original/user-icon-symbol-sign-vector.jpg",
        };
        const token = genToken(userData);
        return res.status(200).json({
          message: "Login Successfull",
          user: { ...userData, token },
        });
      } else {
        return res.status(400).json({ message: "Password Incorrect..!" });
      }
    } else {
      return res.status(400).json({ message: "User Not doesn't Exist" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      message: "User Not doesn't Exist",
      err: error.message,
    });
  }
};

exports.adduser = async (req, res) => {
  try {
    const { name, email, githubid, username, password } = req.body;
    pwd = await encyptpwd(password);
    const find = await User.findOne({ username: username });

    if (!name || !email || !username || !password) {
      return res.json({
        message: "Please give required info",
      });
    }
    if (find) {
      return res.json({
        message: "Username already Exists Use Another.",
      });
    }
    const insert = new User({ name, email, githubid, username, password: pwd });
    await insert.save();
    await reg_mail.send_signup_mail(username);
    return res.json({
      message: "User Registration Successfull",
      user_details: { name, email, githubid, username },
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

exports.getusers = async (req, res) => {
  try {
    const users = await User.find();
    return res.json({
      message: "Users Data Retreived Successfully",
      users,
      users_count: users.length,
    });
  } catch (error) {
    return res.status(400).json({ meaasage: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { username } = req.user;
    const result = await User.findOneAndDelete({ username: username });
    return res.json({ message: "User Successfully Deleted", result });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "User not Deleted", err: error.message });
  }
};
