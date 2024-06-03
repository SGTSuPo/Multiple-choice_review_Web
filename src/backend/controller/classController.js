const helpers = require("../helpers")

const handleErr = (e) => {
    const err = {
        message: ""
    }
    const message = e.message
    console.log(e.message)
    if (message.includes("duplicate"))
        err.message = "Bạn đã tham gia vào lớp này rồi"
    if (message.includes("notfound"))
        err.message = "Không tìm thấy lớp này"
    if (message.includes("Noclassjoined"))
        err.message = "Bạn chưa tham gia bất kì lớp nào"
    if (message.includes("Noclasscreated"))
        err.message = "Bạn chưa tạo bất kì lớp nào"
    if (err.message != "")
        return err
    else return "Something went wrong"
}

const post_class = async (req, res) => {
    const user = helpers.decode_jwt(req.cookies.jwt)
    try {
        const classID = helpers.create_uuid()
        const queryStr = `INSERT INTO class (id, name, subject, grade) values (@id, @name, @subject, @grade);`
        await req.app.locals.pool.request()
            .input('id', req.app.locals.sql.VarChar(40), classID)
            .input('name', req.app.locals.sql.NVarChar(50), req.body.name)
            .input('subject', req.app.locals.sql.NVarChar(50), req.body.subject)
            .input('grade', req.app.locals.sql.VarChar(5), req.body.grade)
            .query(queryStr)

        const queryStr2 = `INSERT INTO host (classID, hostID) values (@classID, @hostID)`
        await req.app.locals.pool.request()
            .input('classID', req.app.locals.sql.VarChar(40), classID)
            .input('hostID', req.app.locals.sql.VarChar(40), user.id)
            .query(queryStr2)
        res.status(201).send("Succes")

    } catch (err) {
        console.log(err)
        // res.status(400).json(e)
    }
}
const get_join_class = async (req, res) => {
    try {
        const classID = req.query.id
        const queryStr = `select * from class where id = @id`
        const data = await req.app.locals.pool.request()
            .input('id', req.app.locals.sql.VarChar(40), classID)
            .query(queryStr)
        if (data.recordset.length == 0) {
            throw Error("notfound")
        } else {
            const user = helpers.decode_jwt(req.cookies.jwt)
            const queryStr2 = `INSERT INTO member (classID, userID) values (@classID, @userID)`
            await req.app.locals.pool.request()
                .input('classID', req.app.locals.sql.VarChar(40), classID)
                .input('userID', req.app.locals.sql.VarChar(40), user.id)
                .query(queryStr2)
            res.status(200).json("Join class")
        }
    } catch (error) {
        const err = handleErr(error)
        console.log(err)
        res.status(400).json(err.message)
    }
}
const get_all_joined_class = async (req, res) => {
    try {
        // console.log(req.cookies)
        const userID = helpers.decode_jwt(req.cookies.jwt)
        const queryStr = `Select * from member where userID = @userID` // get all class joined by userID (classID, userID)
        const data = await req.app.locals.pool.request()
            .input('userID', req.app.locals.sql.VarChar(40), userID.id)
            .query(queryStr)
        const arrClass = data.recordset;
        if (arrClass.length == 0)
            throw Error("Noclassjoined")
        else {
            for (i = 0; i < arrClass.length; ++i) {
                const classID = arrClass[i].classID

                const queryStr2 = `Select * from class where id = @classID`           // class basic information
                const data = await req.app.locals.pool.request()
                    .input('classID', req.app.locals.sql.VarChar(40), arrClass[i].classID)
                    .query(queryStr2)
                arrClass[i] = data.recordset[0] 
                
                // console.log(classID)
                // get hostID
                const queryStr3 = `Select * from host where classID = @classID`
                const data2= await req.app.locals.pool.request()
                .input('classID', req.app.locals.sql.VarChar(40), classID)
                .query(queryStr3)
                // console.log(data2.recordset)
                const hostID = data2.recordset[0].hostID
                // console.log(hostID)

                //get name
                const queryStr4 = `select * from [user] where id = @id`
                const data3= await req.app.locals.pool.request()
                .input('id', req.app.locals.sql.VarChar(40), hostID)
                .query(queryStr4)
                arrClass[i].hostName = `${data3.recordset[0].firstName} ${data3.recordset[0].lastName}`
            }
            res.status(200).json(arrClass)
        }
    } catch (error) {
        const err = handleErr(error)
        console.log(err)
        res.status(400).send(err)
    }
}

const get_all_created_class = async (req, res) => {
    try {
        const userID = helpers.decode_jwt(req.cookies.jwt)
        const queryStr = `Select * from host where hostID = @hostID` // get all class joined by userID
        const data = await req.app.locals.pool.request()
            .input('hostID', req.app.locals.sql.VarChar(40), userID.id)
            .query(queryStr)
        const arrClass = data.recordset;
        if (arrClass.length == 0)
            throw Error("Noclasscreated")
        else {
            for (i = 0; i < arrClass.length; ++i) {
                const queryStr2 = `Select * from class where id = @classID`
                const data = await req.app.locals.pool.request()
                    .input('classID', req.app.locals.sql.VarChar(40), arrClass[i].classID)
                    .query(queryStr2)
                arrClass[i] = data.recordset[0]
            }
            res.send(arrClass)
        }
    } catch (error) {
        const err = handleErr(error)
        console.log(err)
        res.status(400).send(err)
    }
}

const update_class = async (req, res) => {
    try {
        console.log(req.query.id)
        console.log(req.body)
        const classID = req.query.id
        const queryStr = `UPDATE class SET name = @name, subject = @subject, grade = @grade 
                    WHERE id = @classID`
        await req.app.locals.pool.request()
            .input('classID', req.app.locals.sql.VarChar(40), classID)
            .input('name', req.app.locals.sql.NVarChar(50), req.body.name)
            .input('subject', req.app.locals.sql.NVarChar(50), req.body.subject)
            .input('grade', req.app.locals.sql.VarChar(5), req.body.grade)
            .query(queryStr)
        res.send("Update class")
    } catch (error) {
        console.log(error)
        res.send("Error")
    }
}

module.exports = {
    post_class,
    get_join_class,
    get_all_joined_class,
    get_all_created_class,
    update_class
}