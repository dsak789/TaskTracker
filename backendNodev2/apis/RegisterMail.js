const nodemailer = require('nodemailer')
const User = require('../models/UsersSchema')

const transporter = nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user:'sbcreations14378@gmail.com',
        pass:"ycwi dywl sjsh dkiq"
    },
});


exports.send_signup_mail = async (username)=>{
    console.log("entered into Signup MAILING")
    try {        
        const details = await User.findOne({'username':username})
        const user = details
        const body=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Successful</title>
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
        <h1>Registration Successful!</h1>
    </div>

    <div class="content">
        <p>Greetings, <strong>${user.name}</strong>!</p>

        <p>We are excited to welcome you to the Task Tracker Application. Your account has been successfully created. Below are your login details:</p>

        <p class="highlight">Username: <strong>${user.username}</strong></p>

       

        ${user.githubid ? `
        <p>We've noticed that you've linked your GitHub account. Here is your GitHub ID:</p>
        <p class="highlight">GitHub ID: <strong>${user.githubid}</strong></p>` : ''}

        <div class="video-section">
            <h3>How to Use Task Tracker</h3>
            <p>Watch this video to learn how to use the Task Tracker app efficiently:</p>
            <p>You can <a href="https://github.com/Panga-Deepthi/Html/raw/3180bf27fe3c7949306b35199f9d9f4c54f8b242/Task(09-08)/What's%20it%20like%20to%20work%20at%20Google_.mp4" target="_blank">click here</a> to watch the video in a new tab.</p>
            <p>You can also access this video in the app’s profile settings under the “How to use” section.</p>
        </div>

        <a href="https://tasktracker.streamlit.app" class="button">Go to Task Tracker</a>

        <p>Thank you for choosing Task Tracker to manage your tasks efficiently!</p>
    </div>

    <div class="footer">
        <p>If you have any questions or suggestions, feel free to contact us at <a href="mailto:dsak.official@gmail.com">dsak.official@gmail.com</a></p>
        <p><a href="https://tasktracker.streamlit.app">tasktracker.streamlit.app</a></p>
    </div>
</div>

</body>
</html>

`

        const mailoptions= {
            from:`Task Tracker Admin<abcreations14378@gmail.com>`,
            to:`${user.email}`,
            subject:'Greetings from Task Tracker ',
            text:` `,
            html:`${body}`,
        }
    
        transporter.sendMail(mailoptions,(error,info)=>{
            if(error){
                console.log("Sending Error"+error)
                return error
            }
            else{
                console.log("SENT"+info.response)
                return true
            }
        })
    
    } catch (error) {
        console.log(error)
    }
}


