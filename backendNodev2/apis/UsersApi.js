const User = require('../models/UsersSchema')

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
