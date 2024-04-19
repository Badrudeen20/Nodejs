"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ManagerController_1 = require("../app/controller/ManagerController");
const router = (0, express_1.Router)();
//get all post
router.get("/", ManagerController_1.view);
router.get('/folder/builder', ManagerController_1.folder);
router.get('/folder/private', ManagerController_1.privateFolder);
router.get("/delete/:id", ManagerController_1.remove);
router.get("/view/:id", ManagerController_1.viewFile);
router.post("/save/:id", ManagerController_1.saveFile);
router.get("/delete/doc/:id", ManagerController_1.docremove);
exports.default = router;
