const nodemailer = require("nodemailer");
const User = require("../models/UsersSchema");
const bcrypt = require("bcrypt");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "sbcreations14378@gmail.com",
    pass: "ycwi dywl sjsh dkiq",
  },
});

const pwdgenerator = () => {
  const text =
    "qwertyuiopasdfghjklzxcvbnmASDFGHJKLPOIUYTREWQZXCVBNM0125896347@#$";
  var pwd = "";
  for (let i = 0; i <= 7; i++) {
    pwd = pwd + text.charAt(Math.floor(Math.random() * text.length));
  }
  console.log(pwd);
  return pwd;
};

const encyptpwd = async (pwd) => {
  try {
    const salt = await bcrypt.genSalt(7);
    const encpwd = await bcrypt.hash(pwd, salt);
    return encpwd;
  } catch (error) {
    console.log(error);
  }
};

const verifypwd = async (pwd, encpwd) => {
  try {
    const verify = await bcrypt.compare(pwd, encpwd);
    return verify;
  } catch (error) {
    console.log(error);
  }
};

const reset = async (username, pwd) => {
  try {
    const newPassword = await encyptpwd(pwd);
    const update = await User.updateOne(
      { username: username },
      { $set: { password: newPassword } }
    );
    if (update.modifiedCount === 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
};

exports.reset_password = async (req, res) => {
  console.log("entered into MAILING");
  try {
    const { username } = req.body;
    const newPassword = pwdgenerator();
    const response = reset(username, newPassword);
    if (response) {
      console.log("Pwd Reset Done");
    } else {
      console.log(response);
    }
    const details = await User.find({ username: username });
    const user = details[0];
    console.log(details);
    const body = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .header h1 {
            font-size: 28px;
            color: #333333;
        }
        .content {
            font-size: 18px;
            color: #666666;
            line-height: 1.6;
        }
        .content .highlight {
            font-size: 24px;
            font-weight: bold;
            color: #f04a3a;
            text-align: center;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 14px;
            color: #999999;
        }
        .footer a {
            color: #4a90e2;
            text-decoration: none;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4a90e2;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .button:hover {
            background-color: #357ab8;
        }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <h1>Password Reset Successful!</h1>
    </div>

    <div class="content">
        <p>Hello, <strong>${user.name}</strong>,</p>

        <p>We have successfully reset your password as requested. You can now log in using the following credentials:</p>

        <p class="highlight">Your new password: <strong>${newPassword}</strong></p>

        <p>For security reasons, please change your password immediately after logging in by going to your profile settings.</p>

        <p>If you did not request this password reset, please contact us immediately.</p>

        <a href="https://tasktracker.streamlit.app" class="button">Go to Task Tracker</a>

        <p >Thank you for using our Task Tracker Application!</p>
    </div>

    <div class="footer">
        <p>If you have any questions or suggestions feel free to contact us at <a href="mailto:dsak.official@gmail.com">dsak.official@gmail.com</a></p>
        <p><a href="https://tasktracker.streamlit.app">tasktracker.streamlit.app</a></p>
    </div>
</div>

</body>
</html>

`;
    if (username == null) {
      const required = {
        username: "",
      };
      console.log(req.body.rollno);
      return res.json({ success: "All These Fields Required", required });
    } else {
      const mailoptions = {
        from: `Task Tracker Admin<sbcreations14378@gmail.com>`,
        to: `${user.email}`,
        subject: "Password Reset",
        text: ` `,
        html: `${body}`,
      };

      transporter.sendMail(mailoptions, (error, info) => {
        if (error) {
          console.log("Sending Error" + error);
          returnres.status(500).send("Email Sending Failed!");
        } else {
          console.log("SENT" + info.response);
          returnres.json({
            success: true,
            message: "New Password Sent to Registered Email",
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.receive = (req, res) => {
  try {
    return res.send(`im recieving ${(req.params.username, pwdgenerator())}`);
  } catch (error) {
    console.log(error);
  }
};

exports.changePassword = async (req, res) => {
  try {
    const jwtuser = req.user.username;
    const { username, oldPassword, newPassword } = req.body;
    if (jwtuser !== username) {
      return res
        .status(403)
        .json({ message: "Access denied to change other's profile details" });
    }
    newpwd = await encyptpwd(newPassword);
    const details = await User.findOne({ username: username });
    if (await verifypwd(oldPassword, details.password)) {
      const update = await User.updateOne(
        { username: username },
        { $set: { password: newpwd } }
      );
      if (update.modifiedCount === 1) {
        return res.json({
          message: "Password Changed",
          details,
        });
      } else {
        return res.status(400).json({
          message: "Password Not Changed",
        });
      }
    } else {
      return res.status(400).json({
        message: "Incorrect Old Password",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
