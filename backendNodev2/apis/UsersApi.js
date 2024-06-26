const User = require('../models/UsersSchema')


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

