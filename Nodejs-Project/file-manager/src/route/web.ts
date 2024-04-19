import { Router } from "express";
import { docremove, folder, privateFolder, remove, saveFile, truncate, view, viewFile } from "../app/controller/ManagerController";
const router: Router = Router();
//get all post

router.get("/", view);
router.get('/folder/builder',folder);
router.get('/folder/private',privateFolder);
router.get("/delete/:id", remove);
router.get("/view/:id", viewFile);
router.post("/save/:id", saveFile);
router.get("/delete/doc/:id", docremove);
router.get("/truncate/:table", truncate);


export default router;