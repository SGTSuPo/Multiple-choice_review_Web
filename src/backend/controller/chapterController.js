const helpers = require("../helpers")

const handleErr = (e) => {
    const err = {
        message: ""
    }
    const message = e.message
    console.log(e.message)
    if (message == undefined) return "Something went wrong"
    if (message.includes("nochapter"))
        err.message = "Không tìm thấy bất kì chapter nào"
    if (err.message != "")
        return err
    else return "Something went wrong"
}

const post_chapter = async (req, res) => {
    try {
        const chapterID = helpers.create_uuid()
        const queryStr = `INSERT INTO chapter (id, name, description, classID, flag) values (@id, @name, @description, @classID, @flag);`
        await req.app.locals.pool.request()
            .input('id', req.app.locals.sql.VarChar(40), chapterID)
            .input('name', req.app.locals.sql.NVarChar(50), req.body.name)
            .input('description', req.app.locals.sql.NVarChar(50), req.body.description)
            .input('classID', req.app.locals.sql.VarChar(40), req.body.classID)
            .input('flag', req.app.locals.sql.Int, 1)
            .query(queryStr)
        res.status(200).json("Create 1 chapter")
    } catch (error) {
        console.log(error)
        // const e = handleErr(Error) // classID khong ton tai
        res.status(400).json("Error")
    }

}

const get_all_chapter_by_classID = async (req, res) => {
    try {
        const classID = req.query.id
        queryStr = `Select * from chapter where classID = @classID`
        const data = await req.app.locals.pool.request()
            .input('classID', req.app.locals.sql.VarChar(40), classID)
            .query(queryStr)
        if (data.recordset.length == 0)
            throw Error("nochapter")
        else {
            queryStr2 = `Select * from class where id = @classID`
            const data2 = await req.app.locals.pool.request()
                .input('classID', req.app.locals.sql.VarChar(40), classID)
                .query(queryStr2)
            let respone = {
                class: {
                    id: "",
                    name: ""
                },
                chapter: data.recordset
            }
            respone.class.id = data2.recordset[0].id
            respone.class.name = data2.recordset[0].name
            res.send(respone)
        }
    } catch (error) {
        const e = handleErr(error)
        res.send(e)
    }
}

module.exports = {
    post_chapter,
    get_all_chapter_by_classID,
}