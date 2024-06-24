const User = require('../schemas/UsersSchema')
const bcrypt = require('bcrypt')

const encryptpwd = async (pwd) =>{
    try {
        const salt = await bcrypt.genSalt(10)
        const enc_pwd =await bcrypt.hash(pwd,salt)
        return enc_pwd
    } catch (error) {
        console.log(error)
    }
}

const verifypwd = async (pwd,encpwd) =>{
    try {
        const verify = await bcrypt.compare(pwd,encpwd)
        return verify
    } catch (error) {
        console.log(error)
    }
}



exports.adduser = async (req,res)=>{
    try {
        const userData = req.body
        const insert = new User(userData)
        await insert.save();
        res.json({
            message:"User Registration Successfull.."
        })
    } catch (error) {
        res.status(400).json({
            message:`${error}`
        })
    }
}

exports.login = async (req,res)=>{
    try {
        const {username,password} = req.body
        const user = await User.findOne({'username':`${username}`})
        if (user.username) {
            if (verifypwd(password,user.password)){
                res.json({
                    message:"Login Successfull",
                    user:{
                        "name":user.name,
                        'username':user.username,
                        'githubid':user.githubid
                    }
                })
            }
            else{
                res.status(400).json({meaasage:"Invalid Credentials"})
            }
        }
        else{
            res.status(400).json({message:"User Not doesn't Exist"})
        }
    } catch (error) {
        res.status(400).json({
            message: "Invalid Credentials",
            err:error
        })
    }
}

exports.getusers = async (req,res)=>{
    try {
        const users = await User.find()
        res.json({
            message:"Users Data Retreived Successfully",
            users
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


exports.check = async (req,res)=>{
    try {
        const {password,encpwd} = req.body
        if (verifypwd(password,encpwd)){
            res.json({message:true})
        }
    } catch (error) {
        res.status(400).json({message:false,err:error})
    }
}
