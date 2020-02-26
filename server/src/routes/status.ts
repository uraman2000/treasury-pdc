import { Router } from "express";
import UserController from "../controller/UserController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import StatusController from "../controller/StatusController";

const router = Router();

router.get("/", checkJwt, StatusController.allStatus);

router.get("/:tableName", [checkJwt, checkRole(["ADMIN"])], StatusController.all);

router.post("/:tableName", [checkJwt, checkRole(["ADMIN"])], StatusController.save);

router.delete("/:tableName/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], StatusController.remove);

export default router;
