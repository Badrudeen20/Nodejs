const express = require("express");
const MapController = require("../app/controller/MapController");
const UserController = require("../app/controller/UserController");
const router = express.Router();

router.get("/", MapController.map)
router.get("/user", UserController.user)
router.all("/login", UserController.login)
router.all("/register", UserController.register)

module.exports = router
