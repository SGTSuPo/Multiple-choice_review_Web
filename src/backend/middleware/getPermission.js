const jwt = require("jsonwebtoken")

const getPermission = role => {
    return (req, res, next) => {
        const token = req.cookies.jwt
        if (token) {
            jwt.verify(token, process.env.privateKey, (err, decode) => {
                if (err) {
                    console.log(err)
                    // return res.redirect('/login')
                    return res.status(401).send("Dont have permission")
                } else {
                    // console.log(decode)
                    const queryStr = "select * from [user] where id = @id"
                    return req.app.locals.pool.request()
                        .input('id', req.app.locals.sql.VarChar(40), decode.id)
                        .query(queryStr, (err, data) => {
                            if (err) {
                                console.log(err)
                                // return res.redirect('/login')
                                return res.status(401).send("Dont have permission")
                            } else {
                                // const role = data.recordset[0].roleID
                                // res.send(data.recordset[0].roleID)
                                const userID = data.recordset[0].roleID
                                // console.log(userID)
                                if (userID == role)
                                    next();
                                // return res.redirect('/login')
                                else return res.status(401).send("Dont have permission")
                            }
                        })
                }
            })
        }
        else return res.status(401).send("Dont have permission")
        // else return res.redirect('/login')
    }
}

module.exports = getPermission