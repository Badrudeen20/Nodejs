const express = require("express")
const router = express.Router()
module.exports = ((callback)=>{
     callback(router)
     return router
})