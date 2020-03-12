import { Router } from "express";
import AuthController from "../controller/AuthController";
import { checkJwt } from "../middlewares/checkJwt";
import BranchController from "../controller/BranchController";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

router.get("/", [checkJwt, checkRole(["ADMIN"])], BranchController.all);

router.get("/lookUp", [checkJwt], BranchController.lookUp);

router.get("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], BranchController.one);

router.post("/", [checkJwt, checkRole(["ADMIN"])], BranchController.save);

router.delete("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], BranchController.remove);

export default router;
