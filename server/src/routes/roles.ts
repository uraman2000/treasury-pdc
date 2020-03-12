import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import RolesController from "../controller/RolesController";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

router.get("/roleName/:role", [checkJwt], RolesController.one);

router.get("/", [checkJwt], RolesController.all);

router.get("/lookup", [checkJwt], RolesController.lookUp);

router.get("/access-values", [checkJwt], RolesController.accessValue);

router.post("/", [checkJwt, checkRole(["ADMIN"])], RolesController.save);

router.delete("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], RolesController.remove);

export default router;
