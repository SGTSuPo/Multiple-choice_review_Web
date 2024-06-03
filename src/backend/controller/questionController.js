const helpers = require("../helpers")

const handleErr = (e) => {
    const err = {
        message: ""
    }
    const message = e.message
    console.log(e.message)
    if (message == undefined) return "Something went wrong"
    if (message.includes("noquestion"))
        err.message = "Không tìm thấy bất kì câu hỏi nào"
    if (err.message != "")
        return err
    else return "Something went wrong"
}

const post_question = async (req, res) => {
    try {
        console.log(req.body)
        const questionID = helpers.create_uuid()
        const queryStr = `INSERT INTO question (id, type, detail, A, B, C, D, ans, explain, chapterID) 
                    values (@id, @type, @detail, @A, @B, @C, @D, @ans, @explain, @chapterID);`
        const data = await req.app.locals.pool.request()
            .input('id', req.app.locals.sql.VarChar(40), questionID)
            .input('type', req.app.locals.sql.NVarChar(20), req.body.type)
            .input('detail', req.app.locals.sql.NVarChar(200), req.body.detail)
            .input('A', req.app.locals.sql.NText, req.body.A)
            .input('B', req.app.locals.sql.NText, req.body.B)
            .input('C', req.app.locals.sql.NText, req.body.C)
            .input('D', req.app.locals.sql.NText, req.body.D)
            .input('ans', req.app.locals.sql.NChar(1), req.body.ans)
            .input('explain', req.app.locals.sql.NVarChar(200), req.body.explain)
            .input('chapterID', req.app.locals.sql.VarChar(40), req.body.chapterID)
            .query(queryStr)
        console.log(data)
        res.status(200).json("Create 1 question")
    } catch (error) {
        console.log(error)
        const e = handleErr(Error) // chapterID khong ton tai
        res.status(400).json(e)
    }
}

const get_all_question_by_chapterID = async (req, res) => {
    try {
        const chapterID = req.query.id
        queryStr = `Select * from question where chapterID = @chapterID`
        const data = await req.app.locals.pool.request()
            .input('chapterID', req.app.locals.sql.VarChar(40), chapterID)
            .query(queryStr)
        if (data.recordset.length == 0)
            throw Error("noquestion")
        else {
            queryStr2 = `Select * from chapter where id = @chapterID`
            const data2 = await req.app.locals.pool.request()
                .input('chapterID', req.app.locals.sql.VarChar(40), chapterID)
                .query(queryStr2)
            let respone = {
                chapter: {
                    id: "",
                    name: "",
                    classID: "",
                },
                questions: data.recordset
            }
            respone.chapter.id = data2.recordset[0].id
            respone.chapter.name = data2.recordset[0].name
            respone.chapter.classID = data2.recordset[0].classID
            res.send(respone)
        }
    } catch (error) {
        const e = handleErr(error)
        res.send(e)
    }
}

module.exports = {
    post_question,
    get_all_question_by_chapterID
}