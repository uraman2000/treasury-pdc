import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import RolesController from "../controller/RolesController";

const router = Router();

router.get("/:role", RolesController.one);

router.get("/", RolesController.all);

router.get("/access-values", RolesController.accessValue);

router.post("/", RolesController.save);

router.delete("/:id([0-9]+)", RolesController.remove);

export default router;
