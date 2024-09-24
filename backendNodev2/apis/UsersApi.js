const User = require('../models/UsersSchema')
const bcrypt = require('bcrypt')
const reg_mail = require('./RegisterMail')

const verifypwd = async (pwd,encpwd) =>{
    try {
        const verify = await bcrypt.compare(pwd,encpwd)
        return verify
    } catch (error) {
        console.log(error)
    }
}

const encyptpwd = async(pwd)=>{
    try {
        const salt =await bcrypt.genSalt(7)
        const encpwd = await bcrypt.hash(pwd,salt)
        return encpwd
    } catch (error) {
        console.log(error)
    }
}




exports.login = async (req,res)=>{
    try {
        const {username,password} = req.body
        const user = await User.findOne({'username':`${username}`})
        if (user) {
            if (await verifypwd(password,user.password)){
                const gitdata = await (await fetch(`https://api.github.com/users/${user.githubid}`)).json()
                res.json({
                    message:"Login Successfull",
                    user:{
                        "name":user.name,
                        'username':user.username,
                        'githubid':user.githubid,
                        "dp_url":gitdata.avatar_url || "https://static.vecteezy.com/system/resources/previews/000/649/115/original/user-icon-symbol-sign-vector.jpg"
                    }
                })
            }
            else{
                res.json({message:"Password Incorrect..!"})
            }
        }
        else{
            res.json({message:"User Not doesn't Exist"})
        }
    } catch (error) {
        res.status(400).json({
            message: "User Not doesn't Exist",
            err:error
        })
    }
}




exports.adduser = async (req,res)=>{
    try {
        const {name,email,githubid,username,password} = req.body
        pwd = await encyptpwd(password)
        const find = await User.findOne({'username':username})
        
        if(!name || !email || !username || !password){
            res.json({
                message:"Please give required info",
            })
            return
        }
        if(find){
            res.json({
                message:"User Name already Exists Use Another Username",
            })
            return
        }
        const insert = new User({name,email,githubid,username,'password':pwd})
        await insert.save();
        await reg_mail.send_signup_mail(username)
        res.json({
            message:"User Registration Successfull..",
            user_details:{name,email,githubid,username,'password':pwd}
        })
    } catch (error) {
        res.status(400).json({
            message:`${error}`
        })
    }
}

exports.getusers = async (req,res)=>{
    try {
        const users = await User.find()
        res.json({
            message:"Users Data Retreived Successfully",
            users,
            "users_count":users.length
        })
    } catch (error) {
        res.status(400).json({meaasage:`${error}`})
    }
}

exports.deleteUser = async (req,res)=>{
    try {
        const id= req.params.id
        const result = await User.findOneAndDelete({'username':`${id}`})
        res.json({message:"User Successfully Deleted",result})
    } catch (error) {
        res.status(400).json({message:"User not Deleted",err:error})
    }
}
