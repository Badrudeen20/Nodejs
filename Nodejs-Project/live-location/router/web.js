const express = require("express");
const MapController = require("../app/controller/MapController");

const router = express.Router();
router.get("/", MapController.view)
module.exports = router
