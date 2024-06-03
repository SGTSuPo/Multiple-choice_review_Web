const express = require("express")
const getPermission = require("../middleware/getPermission")
const chapterController = require("../controller/chapterController")

const app = express()
const router = express.Router()

// 1 - student
// 2 - teacher

// create 1 chapter
router.post("/", getPermission("2"), chapterController.post_chapter )
// Update 1 chapter
router.put("/", getPermission("2"), function(req, res){
    res.send("Update 1 chapter")
})
// Delete 1 chapter
router.delete("/", getPermission("2"), function(req, res){
    res.send("Delete 1 chapter")
})

// get all chapter by classID
router.get("/all", chapterController.get_all_chapter_by_classID)

module.exports = router