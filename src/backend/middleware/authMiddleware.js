const jwt = require("jsonwebtoken")

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token){
        jwt.verify(token, process.env.privateKey, (err, decode) =>{
            if (err){
                console.log(err)
                return res.status(401).json("Error")
            } else {
                // console.log(decode)
                next();
            }
        })
    }
    else return res.status(401).json("Error")
}


module.exports = requireAuth