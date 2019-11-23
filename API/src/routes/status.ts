import { Router } from "express";
import UserController from "../controller/UserController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import AccountStatusController from "../controller/StatusController";

const router = Router();

router.get("/:tableName", [checkJwt, checkRole(["ADMIN"])], AccountStatusController.all);

router.post("/:tableName", [checkJwt, checkRole(["ADMIN"])], AccountStatusController.save);

router.delete("/:tableName/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], AccountStatusController.remove);

export default router;
