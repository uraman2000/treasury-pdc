import { Router } from "express";
import AuthController from "../controller/AuthController";
import { checkJwt } from "../middlewares/checkJwt";
import BanksController from "../controller/BanksController";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

router.get("/", [checkJwt, checkRole(["ADMIN"])], BanksController.all);

router.get("/lookUp", [checkJwt], BanksController.lookUp);

router.get("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], BanksController.one);

router.post("/", [checkJwt, checkRole(["ADMIN"])], BanksController.save);

router.delete("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], BanksController.remove);

export default router;
