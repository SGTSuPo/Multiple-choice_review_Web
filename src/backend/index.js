// node package
const express = require("express")
const sql = require("mssql")
const morgan = require("morgan")
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const requireAuth = require("./middleware/authMiddleware")

// database
const dbConfig = require ("./dbConfig.js") 

// router
const authRouter = require ("./router/authRouter")
const classRouter = require ("./router/classRouter")
const chapterRouter = require ("./router/chapterRouter")
const questionRouter = require ("./router/questionRouter")

const app = express()
const port = process.env.port || 3000

// midleware
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// const allowedOrigins = ['localhost',"http://localhost:5500", "http://127.0.0.1:8080","http://localhost:8080/", "http://192.168.43.47:5500"];
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//       console.log("------")
//       console.log("origin",origin)
//     }
//   },
//   credentials: true,
// }
const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

app.use(cors(corsOptions));

// running
const appPool = new sql.ConnectionPool(dbConfig)
appPool.connect().then(function(pool) {
    app.locals.pool = pool;
    app.locals.sql = sql;
    const server = app.listen(port, function () {
      console.log(`Hosting on port ${port}`)
    })
  }).catch(function(err) {
    console.error('Error creating connection pool', err)
  });

app.get("/", function (req, res){
  console.log(req.cookies)
})

//router
app.use('/auth', authRouter)

app.use(requireAuth)

app.use('/class', classRouter)
app.use('/chapter', chapterRouter)
app.use('/question', questionRouter)

