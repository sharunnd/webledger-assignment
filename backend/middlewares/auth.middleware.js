const jwt = require("jsonwebtoken")
require("dotenv").config()

const auth = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1]

    if(token){
        try {
            const decoded = jwt.verify(token, `${process.env.SECRET_KEY}`)
            if(decoded){
                req.body.userID = decoded.userID
                next()
            }else{
                res.status(400).json({msg:"Not Authorized!"})
            }
        } catch (error) {
            res.status(400).json({error:"Please login!"})
        }
    }else{
        res.status(400).json({msg:"Please login!!"})
    }
}

module.exports = {
    auth
}