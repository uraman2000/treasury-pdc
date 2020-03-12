import { Router } from "express";
import AuthController from "../controller/AuthController";
import { checkJwt } from "../middlewares/checkJwt";
import RegionController from "../controller/RegionController";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

router.get("/", [checkJwt], RegionController.all);

router.get("/lookUp", [checkJwt], RegionController.lookUp);

router.get("/:id([0-9]+)", [checkJwt], RegionController.one);

router.post("/", [checkJwt, checkRole(["ADMIN"])], RegionController.save);

router.delete("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], RegionController.remove);

export default router;
