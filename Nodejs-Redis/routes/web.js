const express = require('express')

// controller functions
/* const TestContrller = require('../app/controller/TestController') */
const QueueController = require('../app/controller/QueueController') 
const router = express.Router()


/* router.get('/todo', TestContrller.todo)
router.get('/user', TestContrller.user) */

router.get('/message',QueueController.message)

module.exports = router