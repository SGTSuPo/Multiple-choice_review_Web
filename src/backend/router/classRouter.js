const express = require("express")
const getPermission = require("../middleware/getPermission")
const classController = require("../controller/classController")

const app = express()
const router = express.Router()

// 1 - student
// 2 - teacher

router.get("/join", getPermission("1"),classController.get_join_class)

router.get("/joined", getPermission("1"),classController.get_all_joined_class)

router.get("/created", getPermission("2"), classController.get_all_created_class) 

router.post("/", getPermission("2"), classController.post_class)// create class
    // if roleID = teacher then else 401  

router.put("/", getPermission("2"), classController.update_class) //update_class basic information

module.exports = router
