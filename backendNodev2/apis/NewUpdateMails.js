const nodemailer = require("nodemailer");
const User = require("../models/UsersSchema");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "sbcreations14378@gmail.com",
    pass: "ycwi dywl sjsh dkiq",
  },
});



exports.send_new_update_info = async (req, res) => {
  console.log("entered into MAILING");
  try {
    const mails =await getUserMails()
    const body = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Update from Task Tracker</title>
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
            color: #4a90e2;
            text-align: center;
            margin: 20px 0;
        }
        .video-section {
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
        .signature {
            font-size: 16px;
            font-weight: bold;
            color: #4a90e2;
            margin-top: 30px;
            text-align: center;
        }
            .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4a90e2;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            margin: 0px 1px 0px 200px;
        }
        .button:hover {
            background-color: #357ab8;
        }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <h1>Exciting Update from Task Tracker!</h1>
    </div>

    <div class="content">
        <h4>Dear Achiever,</h4>
        <p>Thank you for being a valued user of Task Tracker. We’re thrilled to share some exciting news with you!</p>

        <p>As part of our commitment to improve your experience and enhance productivity, we are excited to introduce the new <strong>Task Tracker Android Mobile App</strong>! You can now manage your tasks on the go with our user-friendly mobile version.</p>

        <p class="highlight">Download the Task Tracker Mobile App:</p>
        <a href="https://drive.google.com/file/d/1yGKpZne9NjRP4sbx40bKeDGAkv5xpal0/view?usp=sharing" class="button" align='center'>Download App</a>

        <div class="video-section">
            <h3>How to Use the Task Tracker App</h3>
            <p>Watch this video to learn how to make the most of the new mobile app:</p>
            <p><a href="https://drive.google.com/file/d/1yPBS4xffJ1hIpMUByqv70T0jonj0JNOi/view?usp=sharing" target="_blank">Click here to watch the video</a> in a new tab.</p>
        </div>

        <p>We’re always looking for ways to improve. If you have any feedback or suggestions, please feel free to let us know!</p>

        <p>Thank you for choosing Task Tracker to manage your tasks efficiently. We look forward to continuing our journey together!</p>

        <p class="signature">Best regards,<br>Task Tracker by Mr. Dannana Sai Ajith Kumar</p>
    </div>

    <div class="footer">
        <p>If you have any questions or suggestions, feel free to contact us at <a href="mailto:dsak.official@gmail.com">dsak.official@gmail.com</a></p>
        <p><a href="https://tasktracker.streamlit.app">tasktracker.streamlit.app</a></p>
    </div>
</div>

</body>
</html>


`;
    const mailoptions = {
      from: `Task Tracker Admin<sbcreations14378@gmail.com>`,
      to: "",
      bcc: mails,
      subject: "Hey Achiever! New Update from Task Tracker",
      text: ` `,
      html: `${body}`,
    };

    transporter.sendMail(mailoptions, (error, info) => {
      if (error) {
        console.log("Sending Error" + error);
        res.status(500).send("Email Sending Failed!");
      } else {
        console.log("SENT" + info.response);
        res.json({
          success: true,
          message: "New Update Email Sent all Users",
          usermails: mails,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const getUserMails = async () => {
  try {
    const details = await User.find().select("name email username -_id");
    const mails = [
      details.map((mail) => {
        return mail.email;
      }),
    ];
    if (details) {
      return mails[0]
    } else {
      return []
    }
  } catch (error) {
    console.log(error);
  }
};
