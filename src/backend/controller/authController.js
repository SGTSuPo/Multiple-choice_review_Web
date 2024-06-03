const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const helpers = require("../helpers")

const unicodeCheck = (req) => {
    if (/[^A-Za-z0-9]/.test(req.body.username))
        throw Error("username")
    if (/[^A-Za-z0-9]/.test(req.body.password))
        throw Error("password")
}

const hashPass = async (plainPass) => {
    const salt = await bcrypt.genSalt(10)  //round = 10
    const hashPass = await bcrypt.hash(plainPass, salt)
    return hashPass
}

const maxAge = 24 * 60 * 60 // 1 day
const createToken = (data) => {
    return jwt.sign(data, process.env.privateKey, {
        expiresIn: maxAge
    })
}

const login = (data, pass) => {
    if (data[0] == undefined)
        throw Error("usernamelogin")
    else {
        hash = data[0].password
        const flag = bcrypt.compareSync(pass, hash)
        if (flag)
            return {
                id: data[0].id,
                roleID: data[0].roleID
            }
        else throw Error("passwordlogin")
    }

}

const handleErr = (e) => {
    // nhap qua so ky tu cho phep
    const err = {
        username: "",
        password: ""
    }
    const message = e.message
    console.log(e.message)
    if (message == 'username')
        err.username = "Xin lỗi, chỉ được phép sử dụng các chữ cái (a-z), số (0-9)"
    if (message == 'password')
        err.password = "Xin lỗi, chỉ được phép sử dụng các chữ cái (a-z), số (0-9)"
    if (message.includes("duplicate"))
        err.username = "Username đã được sử dụng"
    if (message.includes("usernamelogin"))
        err.username = "Username không tìm thấy"
    if (message.includes("passwordlogin"))
        err.password = "Password sai"
    if (err.username != "" || err.password != "")
        return err
    else return "Something went wrong"
}

const post_signup = async (req, res) => {
    try {
        unicodeCheck(req)  // check unicode username and password
        const queryStr = `INSERT INTO [user] (id, username, password, firstName, lastName, roleId)
                        values (@id, @username, @password, @firstName, @lastName, @roleId)`
        const data = await req.app.locals.pool.request()
            .input('id', req.app.locals.sql.VarChar(40), helpers.create_uuid())
            .input('username', req.app.locals.sql.VarChar(10), req.body.username)
            .input('password', req.app.locals.sql.VarChar(70), await hashPass(req.body.password))
            .input('firstName', req.app.locals.sql.NVarChar(10), req.body.firstName)
            .input('lastName', req.app.locals.sql.NVarChar(10), req.body.lastName)
            .input('roleId', req.app.locals.sql.Int, req.body.roleId)
            .query(queryStr)
        res.status(201).send("Succes")

    } catch (err) {
        console.log(err)
        const e = handleErr(err)
        res.status(400).json(e)
    }
}

const post_login = async (req, res) => {
    try {
        unicodeCheck(req)  // check unicode username and password
        queryStr = `Select * from [user] where username = @username` //SELECT TOP 3 * FROM Customers;
        const data = await req.app.locals.pool.request()
            .input('username', req.app.locals.sql.VarChar(10), req.body.username)
            .query(queryStr)
        const ans = login(data.recordset, req.body.password)  // if not login success will throw error 
        const token = createToken({ "id": ans.id })
        // res.cookie ('jwt', token, { httpOnly: true, sameStrict: "none", maxAge : maxAge * 1000,  path: "/"})
        // res.setHeader('Access-Control-Allow-Headers', 'Set-Cookie')
        res.cookie('jwt', token, {
            path: "/",
            httpOnly: false,
            secure: true,
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000,
        })
        // ans.jwt = token
        res.status(200).json(ans)
    } catch (err) {
        console.log(err)
        const e = handleErr(err)
        res.status(400).json(e)
    }
}

const get_role = async (req, res) => {
    const user = helpers.decode_jwt(req.cookies.jwt)
    const queryStr = "select * from [user] where id = @id"
    await req.app.locals.pool.request()
        .input('id', req.app.locals.sql.VarChar(40), user.id)
        .query(queryStr, (err, data) => {
            if (err) {
                console.log(err)
                return res.status(400).send("Something went wrong")
            } else {
                const userID = data.recordset[0].roleID
                res.status(200).json(userID)
            }
        })
}
const logout = (req, res) => {
    res.cookie('jwt', " ", {
        path: "/",
        httpOnly: false,
        secure: true,
        sameSite: 'None',
        maxAge: 1,
    })
    res.status(200).json("Succes")
}

const get_data = async (req, res) => {
    const user = helpers.decode_jwt(req.cookies.jwt)
    const queryStr = "select * from [user] where id = @id"
    await req.app.locals.pool.request()
        .input('id', req.app.locals.sql.VarChar(40), user.id)
        .query(queryStr, (err, data) => {
            if (err) {
                console.log(err)
                return res.status(400).send("Something went wrong")
            } else {
                const user = {
                    firstName : data.recordset[0].firstName,
                    lastName : data.recordset[0].lastName,
                    dob : data.recordset[0].dob,
                    address : data.recordset[0].address,
                    phone : data.recordset[0].phone,
                    role : data.recordset[0].roleID
                }
                res.status(200).json(user)
            }
        })
}
module.exports = {
    post_signup,
    post_login,
    get_role,
    logout,
    get_data
}


