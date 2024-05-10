const express = require('express');
const CricketController = require('../app/controller/CricketController');

const router = express.Router()
router.get('/',CricketController.home); 
router.get('/player/:match',CricketController.player); 
router.post('/select/:match',CricketController.select); 
router.get('/captain/:match',CricketController.captain); 
router.post('/captain/:match',CricketController.captain); 
router.get('/points',CricketController.points); 

module.exports  = router