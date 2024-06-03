const express = require("express")
const authController = require ("../controller/authController")

const requireAuth = require("../middleware/authMiddleware")
const app = express()
const router = express.Router()


router.post('/signup', authController.post_signup)

router.post('/login', authController.post_login)

router.get('/check', requireAuth, function(req, res){
    res.status(200).send("Ok")
})

router.get('/role', requireAuth, authController.get_role)

router.get('/logout', requireAuth, authController.logout)


router.get("/data", requireAuth, authController.get_data)


module.exports = router