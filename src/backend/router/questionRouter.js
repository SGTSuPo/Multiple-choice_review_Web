const express = require("express")
const getPermission = require("../middleware/getPermission")
const questionController = require ("../controller/questionController")

const app = express()
const router = express.Router()

router.get("/", questionController.get_all_question_by_chapterID) // get all question by chapterID

router.post("/", getPermission("2"), questionController.post_question) //create new question

router.put("/", function(req,res){   // update question by questionID
    res.send("update question")
})

module.exports = router