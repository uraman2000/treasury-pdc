import { Router } from "express";
import AuthController from "../controller/AuthController";
import { checkJwt } from "../middlewares/checkJwt";
import BranchController from "../controller/BranchController";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

router.get("/", [checkJwt], BranchController.all);

router.get("/lookUp", [checkJwt], BranchController.lookUp);

router.get("/:id([0-9]+)", [checkJwt], BranchController.one);

router.post("/", [checkJwt], BranchController.save);

router.delete("/:id([0-9]+)", [checkJwt], BranchController.remove);

export default router;
