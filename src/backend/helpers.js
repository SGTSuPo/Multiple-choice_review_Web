require('dotenv').config()
const jwt = require("jsonwebtoken")
const crypto = require("crypto");


const decode_jwt = jwtString => {
    return jwt.verify(jwtString, process.env.privateKey)
}

const create_uuid = () => {
    return crypto.randomBytes(16).toString("hex");
}

module.exports = {
    decode_jwt,
    create_uuid
}