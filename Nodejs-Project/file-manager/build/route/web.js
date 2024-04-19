"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ManagerController_1 = require("../app/controller/ManagerController");
const router = (0, express_1.Router)();
//get all post
router.get("/", ManagerController_1.view);
router.get('/folder/builder', ManagerController_1.folder);
// router.post("/add", ManagerController.add);
// router.get("/delete/:id", ManagerController.delete);
// // router.all("/edit/:id", HomeController.edit);
// router.get("/status/:id", ManagerController.status);
exports.default = router;
