import { Router } from "express";
const router: Router = Router();
import HomeController from "../app/controller/HomeController";


//get all post
router.get("/", HomeController.view);
router.post("/add", HomeController.add);
router.get("/delete/:id", HomeController.delete);
// router.all("/edit/:id", HomeController.edit);
router.get("/status/:id", HomeController.status);


export default router;