const express = require("express");
const MapController = require("../app/controller/MapController");
const UserController = require("../app/controller/UserController");
const { checkAuth,checkNotAuth } = require("../app/middleware/auth");
const router = express.Router();
router.get("/", MapController.map)
router.get("/user",checkAuth,UserController.user)
router.get("/logout",checkAuth, UserController.logout)

router.all("/login",checkNotAuth, UserController.login)
router.all("/register",checkNotAuth, UserController.register)

module.exports = router
